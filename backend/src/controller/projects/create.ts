import { and, eq } from "drizzle-orm";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { db } from "@/db";
import { clientsTable, projectsTable } from "@/db/schema/main";

export const createProjectSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  workedHours: z.number().optional(),
  clientId: z.number().optional(),
  organisationId: z.coerce.number()
});

export default async (
  request: FastifyRequest<{ Body: z.infer<typeof createProjectSchema> }>,
  reply: FastifyReply
) => {
  const { name, description, workedHours, clientId, organisationId } =
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

  await db.insert(projectsTable).values({
    name,
    description,
    workedHours,
    organisationId,
    clientId,
    updatedAt: new Date()
  });

  return reply.status(201).send({ message: "Projet created successfully" });
};
