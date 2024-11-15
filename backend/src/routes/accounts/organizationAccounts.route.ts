import { FastifyInstance } from "fastify";

import organizationAccounts, {
    getAccountsListQuerySchema,
    getAccountsListSchema
} from "@/controller/accounts/organizationAccounts";

export default async (fastify: FastifyInstance) => {
  fastify.route({
    method: "GET",
    url: "/organizations/:organizationId",
    schema: {
      params: getAccountsListSchema,
      querystring: getAccountsListQuerySchema
    },
    handler: organizationAccounts
  });
};
