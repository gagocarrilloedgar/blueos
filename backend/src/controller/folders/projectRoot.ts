import { db } from "@/db";
import { foldersTable } from "@/db/schema/folders";
import { and, count, eq, isNull } from "drizzle-orm";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const projectRootParams = z.object({
  projectId: z.coerce.number()
});

export const projectRootQueryString = z.object({
  page: z.coerce.number().optional().default(0),
  limit: z.coerce.number().optional().default(5),
  parentId: z.coerce.number().optional()
});

export default async function projectRoot(
  request: FastifyRequest<{
    Params: z.infer<typeof projectRootParams>;
    Querystring: z.infer<typeof projectRootQueryString>;
  }>,
  reply: FastifyReply
) {
  const projectId = request.params.projectId;

  const { organisationId } = request;
  const { page, limit, parentId } = request.query;

  const parentIdQuery = parentId
    ? eq(foldersTable.parentId, parentId)
    : isNull(foldersTable.parentId);

  const query = and(
    eq(foldersTable.projectId, projectId),
    eq(foldersTable.organisationId, organisationId),
    parentIdQuery
  );

  const projectRootCountPromise = db
    .select({ count: count() })
    .from(foldersTable)
    .where(query);

  const projectRootPromise = db.query.foldersTable.findMany({
    offset: page * limit,
    limit: limit,
    columns: {
      id: true,
      name: true
    },
    where: query
  });

  const [projectRootCount, projectRootData] = await Promise.all([
    projectRootCountPromise,
    projectRootPromise
  ]);

  return reply.status(200).send({
    data: projectRootData,
    rowCount: projectRootCount[0].count,
    pageCount: Math.ceil(projectRootCount[0].count / limit)
  });
}
