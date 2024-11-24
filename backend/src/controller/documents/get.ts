import { and, eq } from "drizzle-orm";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { db } from "@/db";
import { documentsTable } from "@/db/schema/documents";

export const getDocumentParams = z.object({
  documentId: z.coerce.number()
});

export const getDocumentQuery = z.object({
  folderId: z.coerce.number().optional(),
  projectId: z.coerce.number().optional()
});

export default async (
  request: FastifyRequest<{
    Params: z.infer<typeof getDocumentParams>;
    Querystring: z.infer<typeof getDocumentQuery>;
  }>,
  reply: FastifyReply
) => {
  const { documentId } = request.params;
  const organisationId = request.organisationId;
  const { projectId, folderId } = request.query;

  const byProject = projectId
    ? eq(documentsTable.projectId, projectId)
    : undefined;

  const byFolder = folderId ? eq(documentsTable.folderId, folderId) : undefined;

  const document = await db.query.documentsTable.findFirst({
    where: and(
      eq(documentsTable.id, documentId),
      eq(documentsTable.organisationId, organisationId),
      byProject,
      byFolder
    )
  });

  return reply.status(200).send({ data: document });
};
