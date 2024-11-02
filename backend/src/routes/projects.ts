import { and, eq } from "drizzle-orm";
import { FastifyInstance, FastifyRequest } from "fastify";
import { z } from "zod";
import { db } from "../db";
import { clientsTable, projectsTable } from "../db/schema/main";

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

  // Get necessary project details for edit
  const projectsEditSchema = z.object({
    projectId: z.string().transform((val) => parseInt(val, 10))
  });

  fastify.route({
    method: "GET",
    url: "/projects/:projectId",
    schema: {
      params: projectsEditSchema
    },
    handler: async (
      request: FastifyRequest<{ Params: z.infer<typeof projectsEditSchema> }>,
      reply
    ) => {
      const project = await db.query.projectsTable.findFirst({
        columns: {
          clientId: false
        },
        with: {
          client: true
        },
        where: (project) =>
          and(
            eq(project.id, request.params.projectId),
            eq(project.organisationId, request.organisationId)
          )
      });

      return reply.send(project);
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

  // Update project
  const projectUpdateSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().optional(),
    workedHours: z.number().optional(),
    clientId: z.number()
  });

  fastify.route({
    method: "PATCH",
    url: "/projects/:projectId",
    schema: {
      body: projectUpdateSchema
    },
    handler: async (
      request: FastifyRequest<{ Body: z.infer<typeof projectUpdateSchema> }>,
      reply
    ) => {
      const { id, name, description, workedHours, clientId } = request.body;

      const clientValid = await db.query.clientsTable.findFirst({
        where: and(
          eq(clientsTable.id, clientId),
          eq(clientsTable.organisationId, request.organisationId)
        )
      });

      if (!clientValid)
        return reply.status(422).send({ message: "Malformed request" });

      await db
        .update(projectsTable)
        .set({
          name,
          description,
          workedHours,
          clientId,
          updatedAt: new Date()
        })
        .where(
          and(
            eq(projectsTable.id, id),
            eq(projectsTable.organisationId, request.organisationId)
          )
        );

      return reply.status(204).send();
    }
  });
};

export default projecRoutes;
