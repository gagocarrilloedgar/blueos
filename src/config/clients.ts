import { Database } from "@/database.types";
import { createClient } from "@supabase/supabase-js";
import { env } from "./env";

export const supabase = createClient<Database>(
  env.supabaseUrl,
  env.supabaseAnonKey
);
