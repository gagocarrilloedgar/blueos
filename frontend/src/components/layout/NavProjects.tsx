import { HashIcon, MoreHorizontal } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import { SidebarProject } from "@/pages/dashboard/LayoutContext";
import { useLayoutContext } from "@/pages/dashboard/useLayoutContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

export function NavProjects() {
  const { projects } = useLayoutContext();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <ProjectsSection projects={projects?.data} count={projects?.rowCount} />
    </SidebarGroup>
  );
}
const ProjectsSection = ({
  projects,
  count
}: {
  projects: SidebarProject[] | undefined;
  count: number | undefined;
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const showAll = count && count > 5;

  if (!projects) return null;

  return (
    <SidebarMenu>
      {projects.map(({ id, name }) => {
        const fullUrl = `/projects/${id}`;

        return (
          <SidebarMenuButton
            key={fullUrl}
            isActive={fullUrl === pathname}
            onClick={() => navigate(fullUrl)}
            tooltip={name}
          >
            <HashIcon className="h-4 w-4" />
            {name}
          </SidebarMenuButton>
        );
      })}
      {showAll && (
        <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70" asChild>
            <Link to="/projects">
              <MoreHorizontal className="text-sidebar-foreground/70" />
              <span>View all</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      )}
    </SidebarMenu>
  );
};
