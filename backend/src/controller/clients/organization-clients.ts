import { eq } from "drizzle-orm";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { db } from "@/db";
import { clientsTable } from "@/db/schema/main";

export const getClientsIdScheme = z.object({
  organisationId: z.string().transform((val) => Number(val))
});

export default async (
  request: FastifyRequest<{ Params: z.infer<typeof getClientsIdScheme> }>,
  reply: FastifyReply
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
};
