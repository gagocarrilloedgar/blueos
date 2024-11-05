import { clerkClient } from "@clerk/fastify";
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
  // Invite user - use clerk
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

      return reply.send(account);
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
