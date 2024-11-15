import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { db } from "@/db";
import { clientsTable } from "@/db/schema/main";

export const createClientSchema = z.object({
  name: z.string(),
  organisationId: z.number()
});

export default async (
  request: FastifyRequest<{ Body: z.infer<typeof createClientSchema> }>,
  reply: FastifyReply
) => {
  const { organisationId } = request.body;
  const reqOrganisationId = Number(organisationId);

  if (reqOrganisationId !== request.organisationId)
    return reply.status(422).send({ message: "Malformed request" });

  await db.insert(clientsTable).values(request.body);

  return reply.status(201).send({ message: "Client created successfully" });
};
