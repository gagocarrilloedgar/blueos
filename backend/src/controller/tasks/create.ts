import { and, eq } from "drizzle-orm";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { db } from "@/db";
import { clientsTable } from "@/db/schema/main";
import { tasksTable } from "@/db/schema/tasks";

export const createTasksBody = z.object({
  name: z.string(),
  description: z.string().optional(),
  organisationId: z.coerce.number(),
  projectId: z.coerce.number(),
  clientId: z.coerce.number().optional()
});

export default async (
  request: FastifyRequest<{ Body: z.infer<typeof createTasksBody> }>,
  reply: FastifyReply
) => {
  const { name, organisationId, clientId, projectId, description } =
    request.body;

  if (organisationId !== request.organisationId)
    return reply.status(422).send({ message: "Malformed request" });

  const clientValid = clientId
    ? await db.query.clientsTable.findFirst({
        where: and(
          eq(clientsTable.id, clientId),
          eq(clientsTable.organisationId, request.organisationId)
        )
      })
    : true;

  if (!clientValid)
    return reply.status(422).send({ message: "Malformed request" });

  await db.insert(tasksTable).values({
    name,
    description,
    organisationId,
    clientId,
    projectId
  });

  return reply.status(201).send({ message: "Task created successfully" });
};
