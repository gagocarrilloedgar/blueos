import { clerkClient, clerkPlugin, getAuth } from "@clerk/fastify";
import { eq, or } from "drizzle-orm";
import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { db } from "../db";
import {
  accountsTable,
  membershipsTable,
  organisationsTable
} from "../db/schema/main";

const routePrefix = "/api/v1";
const skipAccountValidationRoutes = ["/accounts-onboarding"];

const authorise = (fastify: FastifyInstance) => {
  fastify.register(clerkPlugin);

  fastify.addHook("preHandler", async (request, reply) => {
    const pathWithoutPrefix = request.url.replace(routePrefix, "");

    const { userId } = getAuth(request);

    if (!userId) {
      return reply.status(401).send({ error: "Unauthorized" });
    }

    const user = await clerkClient.users.getUser(userId);

    if (user.banned) {
      return reply.status(401).send({ error: "Unauthorized" });
    }

    request.userId = userId;
    request.email = user.emailAddresses[0].emailAddress;

    if (skipAccountValidationRoutes.includes(pathWithoutPrefix)) return;

    const organisationInfo = await db
      .select({
        accountId: accountsTable.id,
        userId: accountsTable.userId,
        organisationId: organisationsTable.id,
        organisationName: organisationsTable.name
      })
      .from(accountsTable)
      .innerJoin(
        membershipsTable,
        eq(membershipsTable.accountId, accountsTable.id)
      )
      .innerJoin(
        organisationsTable,
        eq(organisationsTable.id, membershipsTable.ownerId)
      )
      .where(
        or(
          eq(accountsTable.email, request.email),
          eq(accountsTable.id, request.accountId)
        )
      )
      .execute();

    const organisation = organisationInfo[0];

    if (organisation?.userId !== request.userId)
      return reply.status(401).send({
        message: "Not verified",
        data: {
          organisation: {
            name: organisation?.organisationName,
            id: organisation?.organisationId
          }
        }
      });

    if (!organisation?.accountId || !organisation?.organisationId) {
      return reply.status(401).send({ error: "Unauthorized" });
    }

    request.accountId = organisation.accountId;
    request.organisationId = organisation.organisationId;
  });
};

export default fp(authorise);
