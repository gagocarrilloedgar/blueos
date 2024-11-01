import { and, eq } from "drizzle-orm";
import { FastifyInstance, FastifyRequest } from "fastify";
import { z } from "zod";
import { db } from "../db";
import { projectsTable } from "../db/schema/main";

const projecRoutes = (fastify: FastifyInstance) => {
  fastify.route({
    method: "GET",
    url: "/projects",
    handler: async (request, reply) => {
      const projects = await db.query.projectsTable.findMany({
        columns: {
          id: true,
          name: true,
          createdAt: true
        },
        where: (project) => eq(project.organisationId, request.organisationId)
      });

      return reply.send(projects);
    }
  });

  const createProjectSchema = z.object({
    name: z.string(),
    organisationId: z.number()
  });

  fastify.route({
    method: "POST",
    url: "/projects",
    schema: {
      body: createProjectSchema
    },
    handler: async (
      request: FastifyRequest<{ Body: z.infer<typeof createProjectSchema> }>,
      reply
    ) => {
      const { name, organisationId } = request.body;

      if (Number(organisationId) !== request.organisationId)
        return reply.status(422).send({ message: "Malformed request" });

      await db.insert(projectsTable).values({
        name,
        organisationId: request.organisationId
      });

      return reply.status(201).send();
    }
  });

  // Delete project
  const deleteProjectSchema = z.object({
    projectId: z.string().transform((val) => parseInt(val, 10))
  });

  fastify.route({
    method: "DELETE",
    url: "/projects/:projectId",
    schema: {
      params: deleteProjectSchema
    },
    handler: async (
      request: FastifyRequest<{ Params: z.infer<typeof deleteProjectSchema> }>,
      reply
    ) => {
      const { projectId } = request.params;

      await db
        .delete(projectsTable)
        .where(
          and(
            eq(projectsTable.id, projectId),
            eq(projectsTable.organisationId, request.organisationId)
          )
        );

      return reply.status(204).send();
    }
  });
};

export default projecRoutes;
