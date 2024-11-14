import { FastifyInstance } from "fastify";

import deleteAccount, {
  deleteAccountSchema
} from "../../controller/accounts/deleteAccount";

export default async (fastify: FastifyInstance) => {
  fastify.route({
    method: "DELETE",
    url: "/:accountId",
    schema: {
      params: deleteAccountSchema
    },
    handler: deleteAccount
  });
};
