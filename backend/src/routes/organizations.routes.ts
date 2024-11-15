import { FastifyInstance } from "fastify";

import accountOrganizations, {
  accountIdSchema
} from "@/controller/organizations/account-organizations";
import organizationAccounts, {
  organizationIdSchema
} from "@/controller/organizations/organization-accounts";

export default async (fastify: FastifyInstance) => {
  fastify.route({
    method: "GET",
    url: "/organizations/accounts/:organizationId",
    schema: {
      params: organizationIdSchema
    },
    handler: organizationAccounts
  });

  fastify.route({
    method: "GET",
    schema: {
      params: accountIdSchema
    },
    url: "/organizations/account/:accountId",
    handler: accountOrganizations
  });
};
