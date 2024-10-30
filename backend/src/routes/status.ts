import { FastifyInstance } from "fastify";

const statusRoute = (fastify: FastifyInstance) => {
    fastify.get("/status", async (_request, reply) => {
        return reply.send({ status: "ok" });
    });
};

export default statusRoute;
