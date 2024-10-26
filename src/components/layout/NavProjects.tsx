import { HashIcon, MoreHorizontal } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import { SidebarProject } from "@/modules/sidebar/domain/SidebarRepository";
import { useLayoutContext } from "@/pages/dashboard/useLayoutContext";
import { useLocation } from "react-router-dom";

export function NavProjects() {
  const { projects } = useLayoutContext();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <ProjectsSection projects={projects} />
    </SidebarGroup>
  );
}

const ProjectsSection = ({ projects }: { projects: SidebarProject[] }) => {
  const { pathname } = useLocation();

  const showAll = projects.length > 5;

  if (!projects) return null;

  return (
    <SidebarMenu>
      {projects.map(({ id, name }) => {
        const fullUrl = `/projects/${id}`;

        return (
          <SidebarMenuButton
            key={fullUrl}
            isActive={fullUrl === pathname}
            tooltip={name}
          >
            <HashIcon className="h-4 w-4" />
            <a href={fullUrl}>{name}</a>
          </SidebarMenuButton>
        );
      })}
      {showAll && (
        <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <MoreHorizontal className="text-sidebar-foreground/70" />
            <span>View all</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      )}
    </SidebarMenu>
  );
};
