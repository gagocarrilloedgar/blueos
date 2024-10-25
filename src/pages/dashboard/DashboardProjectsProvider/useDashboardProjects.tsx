import { useContext } from "react";
import { Context } from "./Context";

export const useDashboardProjects = () => {
  const context = useContext(Context);
  if (!context) throw new Error("Can't use context before it's declaration");
  return context;
};
