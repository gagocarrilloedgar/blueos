import { ChevronsUpDown, Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";
import { useLayoutContext } from "@/pages/dashboard/useLayoutContext";
import { Skeleton } from "../ui/skeleton";

export function TeamSwitcher() {
  const { isMobile, open } = useSidebar();
  const { organisations, activeOrg, setOrganisation } = useLayoutContext();

  if (!activeOrg) return <Skeleton className="size-10 rounded-md w-full" />;

  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-orange-200 text-sidebar-primary">
                {activeOrg?.avatar}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeOrg?.name}
                </span>
                <span className="truncate text-xs">{activeOrg?.plan}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Teams
            </DropdownMenuLabel>
            {organisations?.map((organisation, index) => (
              <DropdownMenuItem
                key={organisation.name}
                onClick={() => setOrganisation(organisation)}
                className="gap-2 p-2"
              >
                <div className="flex size-8 items-center justify-center rounded-md border">
                  {organisation?.avatar}
                </div>
                {organisation.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">
                Add organisation
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {open && <SidebarTrigger className="hidden ml-1 md:block" />}
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
