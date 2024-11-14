import { eq } from "drizzle-orm";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { db } from "../../db";
import { accountsTable } from "../../db/schema/main";

export const confirmAccountSchema = z.object({
  name: z.string(),
  userId: z.string()
});

export default async (
  request: FastifyRequest<{ Body: z.infer<typeof confirmAccountSchema> }>,
  reply: FastifyReply
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
};
