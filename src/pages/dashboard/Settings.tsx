import {
    Bell
} from "lucide-react";

import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { AuthRepository } from "@/modules/auth/domain";
import { NavigationMenu } from "./NavigationMenu";

export const SidebarSettings = ({ authRepo }: { authRepo: AuthRepository }) => {
  return (
    <div className="flex gap-2 flex-col justify-center">
      <Button variant="ghost" size="icon">
        <Bell className="h-[1.2rem] w-[1.2rem]" />
      </Button>
      <ModeToggle />
      <NavigationMenu authRepo={authRepo} />
    </div>
  );
};
