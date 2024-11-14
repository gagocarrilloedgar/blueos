import { clerkClient } from "@clerk/fastify";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { db } from "../../db";
import { accountsTable, membershipsTable } from "../../db/schema/main";

export const inviteUserSchema = z.object({
  email: z.string().email()
});

export default async (
  request: FastifyRequest<{ Body: z.infer<typeof inviteUserSchema> }>,
  reply: FastifyReply
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
};
