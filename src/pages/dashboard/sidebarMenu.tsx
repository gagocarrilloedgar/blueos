import {
  Calendar,
  FilesIcon,
  Folders,
  Hash,
  LayoutDashboard,
  List,
  Send,
  UserCircle,
  Users
} from "lucide-react";

export const workspaceMenu = () => [
  {
    name: "Overview",
    icon: <LayoutDashboard className="h-4 w-4" />,
    path: "/app"
  },
  {
    name: "Tasks",
    icon: <List className="h-4 w-4" />,
    path: "/tasks"
  },
  {
    name: "Projects",
    icon: <Folders className="h-4 w-4" />,
    path: "/settings"
  },
  {
    name: "Documents",
    icon: <FilesIcon className="h-4 w-4" />,
    path: "/documents"
  },
  {
    name: "Forms",
    icon: <Send className="h-4 w-4" />,
    path: "/forms"
  },
  {
    name: "Calendar",
    icon: <Calendar className="h-4 w-4" />,
    path: "/calendar"
  },
  {
    name: "Clients",
    icon: <Users className="h-4 w-4" />,
    path: "/clients"
  }
];
export const chatsMenu = () => [
  {
    name: "Acme Inc",
    icon: <Hash className="h-4 w-4" />,
    path: "/acme"
  },
  {
    name: "Free OS Inc",
    icon: <Hash className="h-4 w-4" />,
    path: "/free-os"
  },
  {
    name: "Wade warden",
    icon: <UserCircle className="h-4 w-4" />,
    path: "/wade"
  },
  {
    name: "Emily",
    icon: <UserCircle className="h-4 w-4" />,
    path: "/emily"
  },
  {
    name: "Elias",
    icon: <UserCircle className="h-4 w-4" />,
    path: "/elias"
  }
];
