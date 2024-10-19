import { supabase } from "@/config/clients";
import { Session } from "@supabase/supabase-js";
import { AuthRepository } from "../domain/AuthRepository";

export const createSupabaseAuthRepository = (): AuthRepository => {
  return {
    getSession,
    googleSignIn,
    onAuthChange,
    getAccount,
    logOut
  };
};

const getAccount = async (userId: string) => {
  const { data: account, error } = await supabase
    .from("accounts")
    .select("id, name")
    .eq("user_id", userId)
    .single();

  if (error) {
    throw new Error(`Error fetching account: ${error.message}`);
  }

  return account;
};
const logOut = async () => {
  await supabase.auth.signOut();
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
