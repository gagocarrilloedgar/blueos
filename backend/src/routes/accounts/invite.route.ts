import { FastifyInstance } from "fastify";

import inviteAccount, { inviteUserSchema } from "@/controller/accounts/invite";

export default async (fastify: FastifyInstance) => {
  fastify.route({
    method: "POST",
    url: "/invite",
    schema: {
      body: inviteUserSchema
    },
    handler: inviteAccount
  });
};
