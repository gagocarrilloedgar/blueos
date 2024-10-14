import { AuthRepository } from "../domain";

import { getSession } from "./getSession";
import { googleSignIn } from "./googleSignIn";
import { logOut } from "./logOut";
import { onAuthChange } from "./onAuthChange";

export { getSession, googleSignIn, logOut, onAuthChange };

export const useAuthServices = (repo: AuthRepository) => {
  return {
    getSession: getSession(repo),
    googleSignIn: googleSignIn(repo),
    logOut: logOut(repo),
    onAuthChange: onAuthChange(repo)
  };
};
