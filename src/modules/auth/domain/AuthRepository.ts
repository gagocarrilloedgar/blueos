import { Session } from "@supabase/supabase-js";

export interface AuthRepository {
  googleSignIn: (redirectTo: string) => Promise<void>;
  getSession: () => Promise<Session | null>;
  onAuthChange: (setSession: (session: Session | null) => void) => {
    unsubscribe: () => void;
  };
}
