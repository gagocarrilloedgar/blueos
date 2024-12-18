import { and, count, eq, like, SQL } from "drizzle-orm";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { db } from "@/db";
import { tasksTable } from "@/db/schema/tasks";

export const taskTableQueryString = z.object({
  projectId: z.coerce.number().optional(),
  search: z.string().optional(),
  folderId: z.coerce.number().optional(),
  page: z.coerce.number().optional().default(0),
  limit: z.coerce.number().optional().default(15)
});

export default async function tasks(
  request: FastifyRequest<{
    Querystring: z.infer<typeof taskTableQueryString>;
  }>,
  reply: FastifyReply
) {
  const { organisationId } = request;

  const { page, limit, projectId, folderId, search } = request.query;

  const queryConditions = [
    eq(tasksTable.organisationId, organisationId),
    projectId && eq(tasksTable.projectId, projectId),
    folderId && eq(tasksTable.folderId, folderId)
  ].filter(Boolean) as SQL[];

  const query = and(...queryConditions);

  const countsPromise = db
    .select({ count: count() })
    .from(tasksTable)
    .where(query);

  const tasksPromise = db.query.tasksTable.findMany({
    offset: page * limit,
    limit,
    columns: {
      id: true,
      name: true,
      status: true,
      priority: true,
      description: true,
      createdAt: true
    },
    with: {
      assignees: {
        columns: {
          id: true
        },
        with: {
          account: {
            columns: {
              id: true,
              name: true
            }
          }
        }
      }
    },
    where: (task) => {
      if (search) return and(query, like(task.name, `%${search}%`));

      return query;
    }
  });

  const [tasks, counts] = await Promise.all([tasksPromise, countsPromise]);

  return reply.status(200).send({
    data: tasks.map((task) => ({
      ...task,
      createdAt: task.createdAt?.toLocaleDateString(),
      assignees: task.assignees.map((assignee) => ({
        id: assignee.account?.id,
        name: assignee.account?.name
      }))
    })),
    rowCount: counts[0].count,
    pageCount: Math.ceil(counts[0].count / limit)
  });
}
