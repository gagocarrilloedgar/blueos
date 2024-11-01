import { eq } from "drizzle-orm";
import { FastifyInstance, FastifyRequest } from "fastify";
import { z } from "zod";
import { db } from "../db";
import { membershipsTable, organisationsTable } from "../db/schema/main";

export default async (fastify: FastifyInstance) => {
  const organizationIdSchema = z.object({
    organizationId: z.string()
  });

  fastify.route({
    method: "GET",
    url: "/organizations/accounts/:organizationId",
    schema: {
      params: organizationIdSchema
    },
    handler: async (
      request: FastifyRequest<{ Params: z.infer<typeof organizationIdSchema> }>,
      reply
    ) => {
      const orgId = Number(request.params.organizationId);

      if (orgId !== request.organisationId)
        return reply.status(422).send({ message: "Malformed request" });

      const memberships = await db.query.membershipsTable.findMany({
        columns: {
          id: true
        },
        with: {
          account: {
            columns: {
              id: true,
              name: true,
              createdAt: true
            }
          }
        },
        where: eq(membershipsTable.ownerId, request.organisationId)
      });

      const accounts = memberships
        .filter((membership) => membership.account !== null)
        .map((membership) => membership.account);

      return reply.send(accounts);
    }
  });

  const accountIdSchema = z.object({
    accountId: z.string()
  });

  fastify.route({
    method: "GET",
    schema: {
      params: accountIdSchema
    },
    url: "/organizations/account/:accountId",
    handler: async (
      request: FastifyRequest<{ Params: z.infer<typeof accountIdSchema> }>,
      reply
    ) => {
      const accountId = Number(request.params.accountId);

      if (accountId !== request.accountId)
        return reply.status(422).send({ message: "Malformed request" });

      const organizations = await db.query.organisationsTable.findMany({
        columns: {
          id: true,
          name: true
        },
        where: eq(organisationsTable.id, request.organisationId)
      });

      const mappedOrganizations = organizations.map((organization) => ({
        ...organization,
        plan: "basic",
        avatar: organization.name
          .split(" ")
          .slice(0, 2)
          .map((name) => name.charAt(0))
          .join("")
      }));

      return reply.send(mappedOrganizations);
    }
  });
};
