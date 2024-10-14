import { Session } from "@supabase/supabase-js";
import { createContext } from "react";

interface AuthContextProps {
  session: Session | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  session: null,
  loading: true
});
