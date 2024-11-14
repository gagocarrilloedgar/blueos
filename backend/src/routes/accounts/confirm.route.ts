import { FastifyInstance } from "fastify";

import confirmAcccount, {
  confirmAccountSchema
} from "../../controller/accounts/confirmAcccount";

export default async (fastify: FastifyInstance) => {
  fastify.route({
    method: "POST",
    url: "/confirm",
    schema: {
      body: confirmAccountSchema
    },
    handler: confirmAcccount
  });
};
