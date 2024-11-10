import { clerkClient } from "@clerk/fastify";
import { and, count, eq, like } from "drizzle-orm";
import { FastifyInstance, FastifyRequest } from "fastify";
import { z } from "zod";
import { db } from "../db";
import {
  accountsTable,
  membershipsTable,
  organisationsTable
} from "../db/schema/main";

export default async (fastify: FastifyInstance) => {
  // Confirm user account & link to membership
  const confirmAccountSchema = z.object({
    name: z.string(),
    userId: z.string()
  });

  fastify.route({
    method: "POST",
    url: "/accounts/confirm",
    schema: {
      body: confirmAccountSchema
    },
    handler: async (
      request: FastifyRequest<{ Body: z.infer<typeof confirmAccountSchema> }>,
      reply
    ) => {
      const { accountId } = request;
      const { name, userId } = request.body;

      if (userId !== request.userId)
        return reply.status(422).send({ message: "Bad request" });

      await db
        .update(accountsTable)
        .set({ name, userId })
        .where(eq(accountsTable.id, accountId));

      return reply.status(200).send({ message: "Account confirmed" });
    }
  });

  const inviteUserSchema = z.object({
    email: z.string().email()
  });

  fastify.route({
    method: "POST",
    url: "/accounts/invite",
    schema: {
      body: inviteUserSchema
    },
    handler: async (
      request: FastifyRequest<{ Body: z.infer<typeof inviteUserSchema> }>,
      reply
    ) => {
      const { email } = request.body;

      try {
        await clerkClient.invitations.createInvitation({
          ignoreExisting: true,
          redirectUrl: "http://localhost:5173/signup",
          emailAddress: email
        });

        await db.transaction(async (tx) => {
          const account = await tx
            .insert(accountsTable)
            .values({
              email,
              name: email.split("@")[0]
            })
            .returning();

          await tx.insert(membershipsTable).values({
            accountId: account[0].id,
            ownerId: request.organisationId,
            ownerType: "organisation"
          });
        });

        return reply.send({ message: "Invited user" });
      } catch (error) {
        console.log(error);
        return reply.status(422).send({ message: "Invalid email" });
      }
    }
  });

  // Get current account
  fastify.route({
    method: "GET",
    url: "/accounts/session",
    handler: async (request, reply) => {
      const { accountId } = request;
      const account = await db.query.accountsTable.findFirst({
        where: eq(accountsTable.id, accountId)
      });

      return reply.send({
        data: {
          ...account,
          organisation: {
            id: request.organisationId,
            name: request.organisationName
          }
        }
      });
    }
  });

  const createAccountSchema = z.object({
    name: z.string(),
    organisationName: z.string()
  });

  fastify.route({
    method: "POST",
    url: "/accounts-onboarding",
    schema: {
      body: createAccountSchema
    },
    handler: async (
      request: FastifyRequest<{ Body: z.infer<typeof createAccountSchema> }>,
      reply
    ) => {
      const { name, organisationName } = request.body;
      const { userId, email } = request;

      await db.transaction(async (tx) => {
        const account = await tx
          .insert(accountsTable)
          .values({
            email,
            userId,
            name
          })
          .returning({ id: accountsTable.id });

        const org = await tx
          .insert(organisationsTable)
          .values({
            name: organisationName
          })
          .returning({ id: organisationsTable.id });

        await tx.insert(membershipsTable).values({
          accountId: account[0].id,
          ownerId: org[0].id,
          ownerType: "organisation"
        });
      });

      return reply.status(200).send({ message: "Account created" });
    }
  });

  const getAccountsListSchema = z.object({
    organizationId: z.string()
  });

  const getAccountsListQuerySchema = z.object({
    page: z.coerce.number().default(0),
    limit: z.coerce.number().default(15),
    search: z.string().optional()
  });

  fastify.route({
    method: "GET",
    url: "/accounts/organizations/:organizationId",
    schema: {
      params: getAccountsListSchema,
      querystring: getAccountsListQuerySchema
    },
    handler: async (
      request: FastifyRequest<{
        Params: z.infer<typeof getAccountsListSchema>;
        Querystring: z.infer<typeof getAccountsListQuerySchema>;
      }>,
      reply
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
    }
  });
};
