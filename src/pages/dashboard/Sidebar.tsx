import { PanelRightOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AuthRepository } from "@/modules/auth/domain";
import { Trans } from "@lingui/macro";
import { useLocation } from "react-router-dom";
import { SidebarSettings } from "./Settings";
import { SidebarElement } from "./SidebarElement";
import { chatsMenu, workspaceMenu } from "./sidebarMenu";

export const SideBar = ({
  hide,
  hideSideBar,
  authRepo
}: {
  hide: boolean;
  hideSideBar: () => void;
  authRepo: AuthRepository;
}) => {
  const { pathname } = useLocation();

  return (
    <div className={`hidden border-r ${hide ? "" : "md:flex"}`}>
      <div className="flex h-full justify-between items-center border-r max-h-screen flex-col gap-2 w-16 py-4">
        <Button variant="ghost" onClick={hideSideBar}>
          <PanelRightOpen className="h-5 w-5 text-muted-foreground" />
        </Button>

        <SidebarSettings authRepo={authRepo} />
      </div>
      <div className="flex h-full max-h-screen flex-col w-full">
        <div className="flex px-2 h-12 items-center lg:h-50px">
          <p className="font-semibold">
            <Trans>My workspace</Trans>
          </p>
        </div>
        <nav className="grid w-full items-start px-2 text-sm font-medium">
          <section className="py-2">
            <p className="font-semibold text-xs uppercase py-1.5 text-muted-foreground">
              Inner space
            </p>
            {workspaceMenu().map(({ name, icon, path }) => (
              <SidebarElement
                key={name}
                name={name}
                icon={icon}
                path={path}
                pathname={pathname}
              />
            ))}
          </section>
          <Separator />
          <section className="py-2">
            <p className="font-semibold text-xs uppercase py-1.5 text-muted-foreground">
              Chats
            </p>
            {chatsMenu().map(({ name, path, icon }) => (
              <SidebarElement
                key={name}
                name={name}
                icon={icon}
                path={path}
                pathname={pathname}
              />
            ))}
          </section>
        </nav>
      </div>
    </div>
  );
};
