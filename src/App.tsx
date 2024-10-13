import { Trans } from "@lingui/macro";
import { createClient, Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { env } from "./config";

const supabase = createClient(env.supabaseUrl, env.supabaseAnonKey);

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <p>
        <Trans>Random text in english</Trans>
      </p>
    );
  } else {
    return <div>Logged in!</div>;
  }
}
