import { eq } from "drizzle-orm";
import { FastifyInstance } from "fastify";
import { db } from "../db";
import { membershipsTable } from "../db/schema/main";

export default async (fastify: FastifyInstance) => {
    fastify.route({
        method: "GET",
        url: "/organizations/accounts",
        handler: async (request, reply) => {
            const accounts = await db.query.membershipsTable.findMany({
                with: {
                    account: true,
                },
                where: eq(membershipsTable.ownerId, request.organisationId),
            });

            return reply.send(accounts);
        },
    });
};
