import { FastifyInstance } from "fastify";

import confirmAcccount, {
    confirmAccountSchema
} from "@/controller/accounts/confirmAcccount";

import deleteAccount, {
    deleteAccountSchema
} from "@/controller/accounts/deleteAccount";

import inviteAccount, { inviteUserSchema } from "@/controller/accounts/invite";

import onboarding, {
    createAccountSchema
} from "@/controller/accounts/onboarding";

import organizationAccounts, {
    getAccountsListQuerySchema,
    getAccountsListSchema
} from "@/controller/accounts/organizationAccounts";

import session from "@/controller/accounts/session";

export default async (fastify: FastifyInstance) => {
  fastify.route({
    method: "POST",
    url: "/accounts/confirm",
    schema: {
      body: confirmAccountSchema
    },
    handler: confirmAcccount
  });

  fastify.route({
    method: "DELETE",
    url: "/:accountId",
    schema: {
      params: deleteAccountSchema
    },
    handler: deleteAccount
  });

  fastify.route({
    method: "POST",
    url: "/invite",
    schema: {
      body: inviteUserSchema
    },
    handler: inviteAccount
  });

  fastify.route({
    method: "POST",
    url: "/accounts-onboarding",
    schema: {
      body: createAccountSchema
    },
    handler: onboarding
  });

  fastify.route({
    method: "GET",
    url: "/organizations/:organizationId",
    schema: {
      params: getAccountsListSchema,
      querystring: getAccountsListQuerySchema
    },
    handler: organizationAccounts
  });

  fastify.route({
    method: "GET",
    url: "/session",
    handler: session
  });
};
