import { useContext } from "react";
import { LayoutContext } from "./LayoutContext";

export const useLayoutContext = () => {
  const context = useContext(LayoutContext);

  if (!context) throw new Error("You can use layout outside it's contextF");

  return context;
};
