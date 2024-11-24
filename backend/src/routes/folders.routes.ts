import createFolder, { createFolderSchema } from "@/controller/folders/create";
import projectRoot, {
  projectRootParams,
  projectRootQueryString
} from "@/controller/folders/projectRoot";

import deleteFolder, {
  deleteFolderSchema,
  deleteFoldersParams
} from "@/controller/folders/remove";

import updateFolder, {
  updateFolderParams,
  updateFolderSchema
} from "@/controller/folders/update";

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
    method: "PATCH",
    url: "/folders/:folderId",
    schema: {
      body: updateFolderSchema,
      params: updateFolderParams
    },
    handler: updateFolder
  });

  fastify.route({
    method: "DELETE",
    url: "/folders/:folderId",
    schema: {
      body: deleteFolderSchema,
      params: deleteFoldersParams
    },
    handler: deleteFolder
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
