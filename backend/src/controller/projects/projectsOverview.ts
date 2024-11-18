import { and, count, eq, like } from "drizzle-orm";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { db } from "@/db";
import { projectsTable } from "@/db/schema/main";

export const projectsOverviewSchema = z.object({
  page: z.coerce.number().default(0),
  limit: z.coerce.number().default(15),
  search: z.string().optional().nullable()
});

export default async function projectOverview(
  request: FastifyRequest<{
    Querystring: z.infer<typeof projectsOverviewSchema>;
  }>,
  reply: FastifyReply
) {
  const { page, limit, search } = request.query;
  const countsQuery = db
    .select({ count: count() })
    .from(projectsTable)
    .where(eq(projectsTable.organisationId, request.organisationId));

  const projectQuery = db.query.projectsTable.findMany({
    limit: limit,
    offset: page * limit,
    columns: {
      id: true,
      name: true,
      description: true,
      workedHours: true,
      createdAt: true
    },
    with: {
      client: {
        columns: {
          id: true,
          name: true
        }
      }
    },
    where: (project) => {
      if (search)
        return and(
          eq(project.organisationId, request.organisationId),
          like(project.name, `%${search}%`)
        );

      return eq(project.organisationId, request.organisationId);
    }
  });

  const [projects, counts] = await Promise.all([projectQuery, countsQuery]);

  return reply.send({
    data: projects,
    rowCount: counts[0].count,
    pageCount: Math.ceil(counts[0].count / limit)
  });
}
