// src/index.ts
import "dotenv/config";

import AutoLoad from "@fastify/autoload";
import cors from "@fastify/cors";
import Fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider
} from "fastify-type-provider-zod";

import path from "path";
import authorise from "./plugins/authorise";

const fastify = Fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();

fastify.setValidatorCompiler(validatorCompiler);
fastify.setSerializerCompiler(serializerCompiler);

fastify.register(cors, {
  origin: ["http://localhost:5173"],
  credentials: true
});

fastify.register(authorise);

fastify.register(AutoLoad, {
  dir: path.join(__dirname, "routes"),
  options: { prefix: "/api/v1" },
  maxDepth: 5
});

// Start the server
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log("Server listening on http://localhost:3000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
