import { Bell, type LucideIcon } from "lucide-react";

import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import { useLocation } from "react-router-dom";
import { ModeToggle } from "../ModeToggle";

export function NavMain({
  items
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const { pathname } = useLocation();
  return (
    <SidebarGroup>
      <ModeToggle />
      <SidebarMenuButton tooltip="notifications">
        <Bell />
        <a href="/notifications">Notifications</a>
      </SidebarMenuButton>
      <SidebarGroupLabel>Inner space</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const fullUrl = `/app${item.url}`;

          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    isActive={fullUrl === pathname}
                    tooltip={item.title}
                  >
                    {item.icon && <item.icon />}
                    <a href={fullUrl}>{item.title}</a>
                    {/* <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />*/}
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                {/*<CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <a href={subItem.url}>
                          <span>{subItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>*/}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
