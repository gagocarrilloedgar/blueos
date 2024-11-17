import tasks, { taskTableQueryString } from "@/controller/tasks/tasks";
import { FastifyInstance } from "fastify";

export const tasksRouters = (fastify: FastifyInstance) => {
  fastify.route({
    method: "GET",
    url: "/tasks",
    schema: {
      querystring: taskTableQueryString
    },
    handler: tasks
  });
};
