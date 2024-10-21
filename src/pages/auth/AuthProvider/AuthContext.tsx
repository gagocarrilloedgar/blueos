import { Account } from "@/modules/auth/domain/AuthRepository";
import { Session } from "@supabase/supabase-js";
import { createContext } from "react";

interface AuthContextState {
  session: Session | null;
  account: Account | null;
  loading: boolean;
  googleSignIn: (redirectTo: string) => Promise<void> | null;
  getSession: () => Promise<
    | {
        session: null;
        account: null;
      }
    | {
        account: Account | null;
        session: Session;
      }
  >;
}

export const AuthContext = createContext({} as AuthContextState);
