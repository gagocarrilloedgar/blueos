// fastify.d.ts
import "fastify";

declare module "fastify" {
  interface FastifyRequest {
    userId: string;
    email: string;
    accountId: number;
    organisationId: number;
  }
}
