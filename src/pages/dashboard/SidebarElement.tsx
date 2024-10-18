import { Trans } from "@lingui/macro";
import { ReactNode } from "react";

export const SidebarElement = ({
  icon,
  name,
  pathname,
  path
}: {
  icon: ReactNode;
  name: string;
  pathname: string;
  path: string;
}) => {
  const isActive = pathname === path;
  return (
    <a
      href={path}
      key={path}
      className={`flex px-1 items-center gap-3 rounded-lg py-1.5  ${isActive ? "text-black" : "text-muted-foreground"} transition-all hover:bg-muted`}
    >
      {icon}
      <Trans>{name}</Trans>
    </a>
  );
};
