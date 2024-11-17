import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

import * as folders from "./schema/folders";
import * as schema from "./schema/main";

export const db = drizzle({
  connection: process.env.DATABASE_URL!,
  casing: "camelCase",
  schema: { ...schema, ...folders }
});
