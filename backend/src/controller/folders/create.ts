import { and, eq } from "drizzle-orm";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { db } from "@/db";
import { foldersTable } from "@/db/schema/folders";
import { clientsTable } from "@/db/schema/main";

export const createFolderSchema = z.object({
  name: z.string(),
  organisationId: z.coerce.number(),
  projectId: z.coerce.number(),
  clientId: z.coerce.number().optional()
});

export default async (
  request: FastifyRequest<{ Body: z.infer<typeof createFolderSchema> }>,
  reply: FastifyReply
) => {
  const { name, organisationId, clientId, projectId } = request.body;

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

  await db.insert(foldersTable).values({
    name,
    organisationId,
    clientId,
    projectId
  });

  return reply.status(201).send({ message: "Folder created successfully" });
};
