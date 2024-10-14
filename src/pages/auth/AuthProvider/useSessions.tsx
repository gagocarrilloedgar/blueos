import { useContext } from "react";

import { AuthContext } from "./AuthContext";

export const useSession = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Invalid use of session outside of AuthContext");
  }

  return context;
};
