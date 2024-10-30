import { eq } from "drizzle-orm";
import { FastifyInstance, FastifyRequest } from "fastify";
import { z } from "zod";
import { db } from "../db";
import { accountsTable } from "../db/schema/main";

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
    name: z.string()
  });

  fastify.route({
    method: "POST",
    url: "/users",
    schema: {
      body: createAccountSchema
    },
    handler: async (
      request: FastifyRequest<{ Body: z.infer<typeof createAccountSchema> }>,
      reply
    ) => {
      const { name } = request.body;
      const { userId, email } = request;

      const user = await db.insert(accountsTable).values({
        email,
        userId,
        name
      });

      return reply.send(user);
    }
  });
};
