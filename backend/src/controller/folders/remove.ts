import { eq } from "drizzle-orm";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { db } from "@/db";
import { foldersTable } from "@/db/schema/folders";

export const deleteFolderSchema = z.object({
  organisationId: z.coerce.number()
});

export const deleteFoldersParams = z.object({
  folderId: z.coerce.number()
});

export default async (
  request: FastifyRequest<{
    Body: z.infer<typeof deleteFolderSchema>;
    Params: z.infer<typeof deleteFoldersParams>;
  }>,
  reply: FastifyReply
) => {
  const { organisationId } = request.body;
  const { folderId } = request.params;

  if (organisationId !== request.organisationId)
    return reply.status(422).send({ message: "Malformed request" });

  const folder = await db.query.foldersTable.findFirst({
    columns: { id: true },
    where: eq(foldersTable.id, folderId)
  });

  if (!folder?.id)
    return reply
      .status(404)
      .send({ message: "The folder does not exist request" });

  await db.delete(foldersTable).where(eq(foldersTable.id, folderId));

  return reply.status(200).send({ message: "Folder removed successfully" });
};
