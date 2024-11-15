import { FastifyInstance } from "fastify";

import session from "@/controller/accounts/session";

export default async (fastify: FastifyInstance) => {
  // Get current account
  fastify.route({
    method: "GET",
    url: "/session",
    handler: session
  });
};
