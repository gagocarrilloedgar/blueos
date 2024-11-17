import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

import * as folders from "./schema/folders";
import * as schema from "./schema/main";
import * as tasks from "./schema/tasks";

export const db = drizzle({
  connection: process.env.DATABASE_URL!,
  casing: "camelCase",
  schema: { ...schema, ...folders, ...tasks }
});
