import {
  AudioWaveform,
  BookOpen,
  Command,
  FilesIcon,
  Folders,
  Frame,
  GalleryVerticalEnd,
  LayoutDashboard,
  List,
  Map,
  PieChart,
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
  SidebarHeader,
  SidebarRail
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg"
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise"
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup"
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free"
    }
  ],
  navMain: [
    {
      title: "Overview",
      url: "/app",
      icon: LayoutDashboard,
      isActive: true
    },
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
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart
    },
    {
      name: "Travel",
      url: "#",
      icon: Map
    }
  ]
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavChats projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
