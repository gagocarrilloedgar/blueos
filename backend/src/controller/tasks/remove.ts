import { and, eq } from "drizzle-orm";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { db } from "@/db";
import { tasksTable } from "@/db/schema/tasks";

export const deleteTaskBody = z.object({
  organisationId: z.coerce.number()
});

export const deleteTaskParams = z.object({
  taskId: z.coerce.number()
});

export default async (
  request: FastifyRequest<{
    Body: z.infer<typeof deleteTaskBody>;
    Params: z.infer<typeof deleteTaskParams>;
  }>,
  reply: FastifyReply
) => {
  const { organisationId } = request.body;
  const { taskId } = request.params;

  if (organisationId !== request.organisationId)
    return reply.status(422).send({ message: "Malformed request" });

  const task = await db.query.foldersTable.findFirst({
    columns: { id: true },
    where: and(
      eq(tasksTable.id, taskId),
      eq(tasksTable.organisationId, organisationId)
    )
  });

  if (!task?.id)
    return reply
      .status(404)
      .send({ message: "The Task does not exist request" });

  await db.delete(tasksTable).where(eq(tasksTable.id, taskId));

  return reply.status(200).send({ message: "Task removed successfully" });
};
