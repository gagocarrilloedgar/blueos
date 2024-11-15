import { FastifyInstance } from "fastify";

import onboarding, {
  createAccountSchema
} from "@/controller/accounts/onboarding";

export default async (fastify: FastifyInstance) => {
  fastify.route({
    method: "POST",
    url: "/accounts-onboarding",
    schema: {
      body: createAccountSchema
    },
    handler: onboarding
  });
};
