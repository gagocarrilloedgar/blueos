import { eq } from "drizzle-orm";
import { FastifyReply, FastifyRequest } from "fastify";

import { db } from "@/db";
import { accountsTable } from "@/db/schema/main";

export default async (request: FastifyRequest, reply: FastifyReply) => {
  const { accountId } = request;
  const account = await db.query.accountsTable.findFirst({
    where: eq(accountsTable.id, accountId)
  });

  return reply.send({
    data: {
      ...account,
      isAdmin: request.isAdmin,
      organisation: {
        id: request.organisationId,
        name: request.organisationName
      }
    }
  });
};
