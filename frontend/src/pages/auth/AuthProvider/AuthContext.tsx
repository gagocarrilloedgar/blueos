import { createContext } from "react";

export interface Account {
  id: number;
  name: string;
  initials: string;
  email: string;
}
interface AuthContextState {
  account: Account | null;
  loading: boolean;
  token: string | null;
}

export const AuthContext = createContext({} as AuthContextState);
