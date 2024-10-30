import { Account } from "@/modules/auth/domain/AuthRepository";
import { createContext } from "react";

interface AuthContextState {
  account: Account | null;
  loading: boolean;
  token: string | null;
}

export const AuthContext = createContext({} as AuthContextState);
