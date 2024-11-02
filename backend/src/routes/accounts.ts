import { eq } from "drizzle-orm";
import { FastifyInstance, FastifyRequest } from "fastify";
import { z } from "zod";
import { db } from "../db";
import {
  accountsTable,
  membershipsTable,
  organisationsTable
} from "../db/schema/main";

export default async (fastify: FastifyInstance) => {
  // Get current account
  fastify.route({
    method: "GET",
    url: "/accounts/session",
    handler: async (request, reply) => {
      const { accountId } = request;
      const account = await db
        .select()
        .from(accountsTable)
        .where(eq(accountsTable.id, accountId));
      return reply.send(account[0]);
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
};
