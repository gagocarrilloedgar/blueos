// fastify.d.ts
import "fastify";

declare module "fastify" {
  interface FastifyRequest {
    userId: string;
    email: string;
    accountId: number;
    organisationId: number;
    organisationName: string;
    email: string;
    isAdmin: boolean;
  }
}
