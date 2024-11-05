import { createContext } from "react";

export interface Account {
  id: number;
  name: string;
  initials: string;
  email: string;
}

export interface ConfirmationAccount {
  organisationId: number;
  organisationName: string;
}

interface AuthContextState {
  account: Account | null;
  confirmationAccount: ConfirmationAccount | null;
  loading: boolean;
  logout: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextState);
