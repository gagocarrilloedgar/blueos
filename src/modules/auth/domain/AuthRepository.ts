import { AuthSession, Session as SupbaseSession } from "@supabase/supabase-js";


export type Account = {
  id: number;
  name: string;
};
export type Session = SupbaseSession;

export interface AuthRepository {
  googleSignIn: (redirectTo: string) => Promise<void>;
  getSession: () => Promise<Session | null>;
  onAuthChange: (setSession: (session: AuthSession | null) => void) => {
    unsubscribe: () => void;
  };
  getAccount: (userId: string) => Promise<Account>;
  logOut: () => Promise<void>;
}
