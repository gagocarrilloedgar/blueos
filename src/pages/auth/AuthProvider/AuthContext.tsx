import { Session } from "@supabase/supabase-js";
import { createContext } from "react";

interface AuthContextProps {
  session: Session | null;
}

export const AuthContext = createContext<AuthContextProps>({
  session: null
});
