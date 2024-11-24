import { eq } from "drizzle-orm";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { db } from "@/db";
import { foldersTable } from "@/db/schema/folders";

export const updateFolderSchema = z.object({
  name: z.string(),
  organisationId: z.coerce.number()
});

export const updateFolderParams = z.object({
  folderId: z.coerce.number()
});

export default async (
  request: FastifyRequest<{
    Body: z.infer<typeof updateFolderSchema>;
    Params: z.infer<typeof updateFolderParams>;
  }>,
  reply: FastifyReply
) => {
  const { organisationId, name } = request.body;
  const { folderId } = request.params;

  if (organisationId !== request.organisationId)
    return reply.status(422).send({ message: "Malformed request" });

  const folder = await db.query.foldersTable.findFirst({
    columns: { id: true },
    where: eq(foldersTable.id, folderId)
  });

  if (!folder?.id)
    return reply.status(404).send({ message: "The folder does not exist" });

  await db
    .update(foldersTable)
    .set({
      name,
      updatedAt: new Date()
    })
    .where(eq(foldersTable.id, folderId));

  return reply.status(200).send({ message: "Folder updated successfully" });
};
