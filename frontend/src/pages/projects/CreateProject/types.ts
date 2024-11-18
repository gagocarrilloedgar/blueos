import { z } from "zod";

export const ProjecSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  workedHours: z.coerce.number().optional(),
  clientId: z.coerce.number().optional()
});

export type Client = {
  id: number;
  name: string;
};

export type Project = z.infer<typeof ProjecSchema> & {
  client: Client;
};
