import { and, eq } from "drizzle-orm";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { db } from "@/db";
import { documentsTable } from "@/db/schema/documents";

export const deleteDocumentsSchema = z.object({
  organisationId: z.coerce.number()
});

export const deleteDocumentsParams = z.object({
  documentId: z.coerce.number()
});

export default async (
  request: FastifyRequest<{
    Body: z.infer<typeof deleteDocumentsSchema>;
    Params: z.infer<typeof deleteDocumentsParams>;
  }>,
  reply: FastifyReply
) => {
  const { organisationId } = request.body;
  const { documentId } = request.params;

  if (organisationId !== request.organisationId)
    return reply.status(422).send({ message: "Malformed request" });

  const folder = await db.query.foldersTable.findFirst({
    columns: { id: true },
    where: and(
      eq(documentsTable.id, documentId),
      eq(documentsTable.organisationId, organisationId)
    )
  });

  if (!folder?.id)
    return reply
      .status(404)
      .send({ message: "The Document does not exist request" });

  await db.delete(documentsTable).where(eq(documentsTable.id, documentId));

  return reply.status(200).send({ message: "Document removed successfully" });
};
