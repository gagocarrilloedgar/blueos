import {
  Bell,
  BookOpen,
  Files,
  FilesIcon,
  Folders,
  LayoutDashboard,
  List,
  Send,
  Users
} from "lucide-react";
import * as React from "react";

import { NavChats } from "@/components/layout/NavChats";
import { NavMain } from "@/components/layout/NavMain";
import { NavUser } from "@/components/layout/NavUser";
import { TeamSwitcher } from "@/components/layout/TeamSwitcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail
} from "@/components/ui/sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { NavProjects } from "./NavProjects";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg"
  },
  navMain: [
    {
      title: "Tasks",
      url: "/tasks",
      icon: List
    },
    {
      title: "Projects",
      url: "/projects",
      icon: Folders
    },
    {
      title: "Documentation",
      url: "/docs",
      icon: BookOpen
    },
    {
      title: "Files",
      url: "/documents",
      icon: FilesIcon
    },
    {
      title: "Forms",
      url: "/forms",
      icon: Send
    },
    {
      title: "Clients",
      url: "/clients",
      icon: Users
    }
  ],
  private: [
    {
      title: "Tasks",
      url: "/tasks",
      icon: List
    },
    {
      title: "Documents",
      url: "/documents",
      icon: Files
    }
  ]
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <OverviewNav />
      <SidebarContent>
        <NavProjects />
        <NavChats />
        <NavMain title="Private" items={data.private} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

const OverviewNav = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <SidebarGroup>
      <SidebarMenuButton
        isActive={pathname === "/notifications"}
        onClick={() => navigate("/notifications")}
        tooltip="notifications"
      >
        <Bell />
        Notifications
      </SidebarMenuButton>
      <SidebarMenuButton
        isActive={pathname === "/"}
        onClick={() => navigate("/")}
        tooltip="overview"
      >
        <LayoutDashboard />
        Overview
      </SidebarMenuButton>
    </SidebarGroup>
  );
};
