import { Menu, PanelRightClose } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLocation } from "react-router-dom";
import { SidebarElement } from "./SidebarElement";
import { workspaceMenu } from "./sidebarMenu";

export function MobileSidebar({
  hide,
  showSidebar
}: {
  hide: boolean;
  showSidebar: () => void;
}) {
  const { pathname } = useLocation();
  return (
    <header className="flex h-16 items-center py-4 px-2">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          {workspaceMenu().map(({ name, icon, path }) => (
            <SidebarElement
              key={name}
              name={name}
              icon={icon}
              path={path}
              pathname={pathname}
            />
          ))}
        </SheetContent>
      </Sheet>
      <Button
        variant="ghost"
        size="icon"
        onClick={showSidebar}
        className={`hidden shrink-0 ${hide ? "md:flex" : ""}`}
      >
        <PanelRightClose className="h-5 w-5" />
      </Button>
    </header>
  );
}
