import { eq } from "drizzle-orm";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { db } from "@/db";
import { organisationsTable } from "@/db/schema/main";

export const accountIdSchema = z.object({
  accountId: z.string()
});

export default async (
  request: FastifyRequest<{ Params: z.infer<typeof accountIdSchema> }>,
  reply: FastifyReply
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
};
