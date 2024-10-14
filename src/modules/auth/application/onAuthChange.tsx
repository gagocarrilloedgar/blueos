import { Session } from "@supabase/supabase-js";

import { AuthRepository } from "@/modules/auth/domain";

export const onAuthChange = (repo: AuthRepository) => {
  return function (setSession: (session: Session | null) => void) {
    return repo.onAuthChange(setSession);
  };
};
