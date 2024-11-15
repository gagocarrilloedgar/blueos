import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { db } from "@/db";
import {
  accountsTable,
  membershipsTable,
  organisationsTable
} from "@/db/schema/main";

export const createAccountSchema = z.object({
  name: z.string(),
  organisationName: z.string()
});

export default async (
  request: FastifyRequest<{ Body: z.infer<typeof createAccountSchema> }>,
  reply: FastifyReply
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
};
