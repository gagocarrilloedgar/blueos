import { supabase } from "@/config/clients";
import { Session } from "@supabase/supabase-js";
import { AuthRepository } from "../domain/AuthRepository";

export const createSupabaseAuthRepository = (): AuthRepository => {
  return {
    getSession,
    googleSignIn,
    onAuthChange
  };
};

const getSession = async () => {
  const sessionData = await supabase.auth.getSession();

  return sessionData.data.session;
};

const googleSignIn = async (redirectTo: string) => {
  supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo
    }
  });
};

const onAuthChange = (setSession: (session: Session | null) => void) => {
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    setSession(session);
  });

  return { unsubscribe: data.subscription.unsubscribe };
};
