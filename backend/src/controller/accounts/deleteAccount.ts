import { clerkClient } from "@clerk/fastify";
import { eq } from "drizzle-orm";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { db } from "../../db";
import { accountsTable } from "../../db/schema/main";

export const deleteAccountSchema = z.object({
  accountId: z.coerce.number()
});

export default async (
  request: FastifyRequest<{ Params: z.infer<typeof deleteAccountSchema> }>,
  reply: FastifyReply
) => {
  const { accountId } = request.params;
  const { isAdmin } = request;

  if (!isAdmin) return reply.status(422).send({ message: "Unauthorized" });

  const account = await db.query.accountsTable.findFirst({
    where: eq(accountsTable.id, accountId)
  });

  if (!account?.userId)
    return reply.status(422).send({ message: "Account not found" });

  await Promise.all([
    clerkClient.users.deleteUser(account.userId),
    db.delete(accountsTable).where(eq(accountsTable.id, accountId))
  ]);

  return reply.status(200).send({ message: "Account deleted" });
};
