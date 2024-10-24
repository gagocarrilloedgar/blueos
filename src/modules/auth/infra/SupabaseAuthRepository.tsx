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
    .select("id, name, email")
    .eq("user_id", userId);

  if (error) {
    throw new Error(`Error fetching account: ${error.message}`);
  }

  return account ? account[0] : null;
};

const logOut = async () => {
  await supabase.auth.signOut();
};

const getSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      throw new Error("Error connecting to supabase");
    }

    return data.session;
  } catch {
    throw new Error("Error connecting to Supabase");
  }
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
  try {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return { unsubscribe: data.subscription.unsubscribe };
  } catch {
    return {
      unsubscribe: null
    };
  }
};
