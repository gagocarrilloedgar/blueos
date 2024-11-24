import createFolder, { createFolderSchema } from "@/controller/folders/create";
import projectRoot, {
  projectRootParams,
  projectRootQueryString
} from "@/controller/folders/projectRoot";

import { FastifyInstance } from "fastify";

export default async function (fastify: FastifyInstance) {
  fastify.route({
    method: "GET",
    url: "/folders/project/:projectId",
    schema: {
      params: projectRootParams,
      querystring: projectRootQueryString
    },
    handler: projectRoot
  });

  fastify.route({
    method: "POST",
    url: "/folders",
    schema: {
      body: createFolderSchema
    },
    handler: createFolder
  });
}
