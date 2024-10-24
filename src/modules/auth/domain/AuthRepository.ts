import { AuthSession, Session as SupbaseSession } from "@supabase/supabase-js";

export type Account = {
  id: number;
  name: string;
  email: string;
  initials: string;
};

export type Session = SupbaseSession;

export interface AuthRepository {
  googleSignIn: (redirectTo: string) => Promise<void>;
  getSession: () => Promise<Session | null>;
  onAuthChange: (setSession: (session: AuthSession | null) => void) => {
    unsubscribe: (() => void) | null;
  };
  getAccount: (userId: string) => Promise<Omit<Account, "initials"> | null>;
  logOut: () => Promise<void>;
}
