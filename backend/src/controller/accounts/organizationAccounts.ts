import { and, count, eq, like } from "drizzle-orm";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { db } from "@/db";
import { accountsTable, membershipsTable } from "@/db/schema/main";

export const getAccountsListSchema = z.object({
  organizationId: z.string()
});

export const getAccountsListQuerySchema = z.object({
  page: z.coerce.number().default(0),
  limit: z.coerce.number().default(15),
  search: z.string().optional()
});

export default async (
  request: FastifyRequest<{
    Params: z.infer<typeof getAccountsListSchema>;
    Querystring: z.infer<typeof getAccountsListQuerySchema>;
  }>,
  reply: FastifyReply
) => {
  const orgId = Number(request.params.organizationId);
  const { page, limit, search } = request.query;

  if (orgId !== request.organisationId)
    return reply.status(422).send({ message: "Malformed request" });

  const membershipsCountPromise = db
    .select({ count: count() })
    .from(membershipsTable)
    .where(eq(membershipsTable.ownerId, request.organisationId));

  const membershipsPromise2 = db
    .select({
      isAdmin: membershipsTable.isAdmin,
      account: {
        id: accountsTable.id,
        userId: accountsTable.userId,
        createdAt: accountsTable.createdAt,
        name: accountsTable.name,
        email: accountsTable.email
      }
    })
    .from(accountsTable)
    .innerJoin(
      membershipsTable,
      eq(membershipsTable.accountId, accountsTable.id)
    )
    .where(() => {
      if (!search) return eq(membershipsTable.ownerId, orgId);

      if (search)
        return and(
          eq(membershipsTable.ownerId, orgId),
          like(accountsTable.name, `%${search}%`)
        );
    })
    .limit(limit)
    .offset(page * limit);

  const [membershipsCount, memberships] = await Promise.all([
    membershipsCountPromise,
    membershipsPromise2
  ]);

  const accounts = memberships
    .filter((membership) => membership.account !== null)
    .map((membership) => ({
      ...membership.account,
      isAdmin: membership.isAdmin
    }));

  const mappedAccounts = accounts.map((account) => ({
    ...account,
    verified: account?.userId !== null
  }));

  return reply.send({
    data: mappedAccounts,
    rowCount: membershipsCount[0].count,
    pageCount: Math.ceil(membershipsCount[0].count / limit)
  });
};
