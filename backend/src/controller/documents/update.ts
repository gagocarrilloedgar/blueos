import { and, eq } from "drizzle-orm";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { db } from "@/db";
import { documentsTable } from "@/db/schema/documents";
import { foldersTable } from "@/db/schema/folders";

export const updateDocumentSchema = z.object({
  name: z.string().optional(),
  content: z.string(),
  organisationId: z.coerce.number()
});

export const updateDocumentParams = z.object({
  documentId: z.coerce.number()
});

export default async (
  request: FastifyRequest<{
    Body: z.infer<typeof updateDocumentSchema>;
    Params: z.infer<typeof updateDocumentParams>;
  }>,
  reply: FastifyReply
) => {
  const { organisationId, name, content } = request.body;
  const { documentId } = request.params;

  if (organisationId !== request.organisationId)
    return reply.status(422).send({ message: "Malformed request" });

  const document = await db.query.documentsTable.findFirst({
    columns: { id: true },
    where: and(
      eq(documentsTable.id, documentId),
      eq(documentsTable.organisationId, organisationId)
    )
  });

  if (!document?.id)
    return reply.status(404).send({ message: "The folder does not exist" });

  await db
    .update(documentsTable)
    .set({
      name,
      content,
      updatedAt: new Date()
    })
    .where(eq(foldersTable.id, documentId));

  return reply.status(200).send({ message: "Folder updated successfully" });
};
