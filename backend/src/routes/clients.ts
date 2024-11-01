import { eq } from "drizzle-orm";
import { FastifyInstance, FastifyRequest } from "fastify";
import { z } from "zod";
import { db } from "../db";
import { clientsTable } from "../db/schema/main";

export default async function (fastify: FastifyInstance) {
  const getClientsIdScheme = z.object({
    organisationId: z.string().transform((val) => Number(val))
  });

  fastify.route({
    method: "GET",
    url: "/clients/organisation/:organisationId",
    schema: {
      params: getClientsIdScheme
    },
    handler: async (
      request: FastifyRequest<{ Params: z.infer<typeof getClientsIdScheme> }>,
      reply
    ) => {
      if (request.params.organisationId !== request.organisationId)
        return reply.status(422).send({ message: "Malformed request" });

      const clients = await db.query.clientsTable.findMany({
        columns: {
          id: true,
          name: true
        },
        where: eq(clientsTable.organisationId, request.params.organisationId)
      });

      return reply.send(clients);
    }
  });
}
