import { count, eq } from "drizzle-orm";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { db } from "@/db";
import { membershipsTable } from "@/db/schema/main";

export const organizationIdSchema = z.object({
  organizationId: z.string(),
  page: z.number().optional().default(0),
  limit: z.number().optional().default(5)
});

export default async (
  request: FastifyRequest<{ Params: z.infer<typeof organizationIdSchema> }>,
  reply: FastifyReply
) => {
  const orgId = Number(request.params.organizationId);
  const { page, limit } = request.params;

  if (orgId !== request.organisationId)
    return reply.status(422).send({ message: "Malformed request" });

  const membershipsCountPromise = db
    .select({ count: count() })
    .from(membershipsTable)
    .where(eq(membershipsTable.ownerId, request.organisationId));

  const membershipsPromise = db.query.membershipsTable.findMany({
    columns: {
      id: true
    },
    limit: limit,
    offset: page * limit,
    with: {
      account: {
        columns: {
          id: true,
          userId: true,
          name: true,
          createdAt: true
        }
      }
    },
    where: eq(membershipsTable.ownerId, request.organisationId)
  });

  const [membershipsCount, memberships] = await Promise.all([
    membershipsCountPromise,
    membershipsPromise
  ]);

  const accounts = memberships
    .filter((membership) => membership.account !== null)
    .map((membership) => membership.account);

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
