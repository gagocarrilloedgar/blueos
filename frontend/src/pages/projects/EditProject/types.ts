import { z } from "zod";

export const ProjecSchema = z.object({
  name: z.string(),
  description: z.string(),
  workedHours: z.coerce.number(),
  clientId: z.coerce.number()
});

export type Client = {
  id: number;
  name: string;
};

export type Project = z.infer<typeof ProjecSchema> & {
  id: number;
  client: Client;
};
