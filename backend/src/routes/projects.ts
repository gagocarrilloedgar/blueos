import { eq } from "drizzle-orm";
import { FastifyInstance } from "fastify";
import { db } from "../db";

const projecRoutes = (fastify: FastifyInstance) => {
    fastify.route({
        method: "GET",
        url: "/projects",
        handler: async (request, reply) => {
            const projects = await db.query.projectsTable.findMany({
                columns: {
                    id: true,
                    name: true,
                    createdAt: true,
                },
                where: (project) =>
                    eq(
                        project.organisationId,
                        request.organisationId,
                    ),
            });

            return reply.send(projects);
        },
    });
};

export default projecRoutes;
