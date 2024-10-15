import {
  Bell,
  Calendar,
  Clock,
  Eclipse,
  Files,
  Hash,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Settings,
  ShoppingCart,
  User,
  Users
} from "lucide-react";

import { ModeToggle } from "@/components/ModeToggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AuthRepository } from "@/modules/auth/domain";
import { Trans } from "@lingui/macro";
import { useSession } from "../auth/AuthProvider";
import { NavigationMenu } from "./NavigationMenu";

export function Dashboard({ authRepo }: { authRepo: AuthRepository }) {
  const { loading } = useSession();

  if (loading) return;

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[200px_1fr] lg:grid-cols-[220px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center px-4 lg:h-50px] lg:px-6">
            <a href="/app" className="flex items-center gap-2 font-semibold">
              <Eclipse className="h-6 w-6" />
              <span className="font-extrabold">Blue OS</span>
            </a>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <p className="font-semibold text-xs uppercase pt-5 pb-2 text-muted-foreground">
                Profile
              </p>
              {[
                {
                  name: "My profile",
                  icon: <User className="h-4 w-4" />,
                  path: "/profile"
                },
                {
                  name: "Documents",
                  icon: <Files className="h-4 w-4" />,
                  path: "/my-documents"
                },
                {
                  name: "Settings",
                  icon: <Settings className="h-4 w-4" />,
                  path: "/settings"
                }
              ].map(({ name, icon, path }) => (
                <a
                  href={path}
                  className="flex items-center gap-3 rounded-lg py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  {icon}
                  <Trans>{name}</Trans>
                </a>
              ))}
              <p className="font-semibold text-xs uppercase pt-5 pb-2 text-muted-foreground">
                Time
              </p>
              {[
                { name: "timeoff", icon: <Clock className="h-4 w-4" /> },
                { name: "shifts", icon: <Calendar className="h-4 w-4" /> },
                { name: "documents", icon: <Files className="h-4 w-4" /> },
                { name: "settings", icon: <Settings className="h-4 w-4" /> }
              ].map(({ name, icon }) => (
                <a
                  href="#"
                  className="flex items-center gap-3 rounded-lg py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  {icon}
                  <Trans>{name}</Trans>
                </a>
              ))}
              <p className="font-semibold text-xs uppercase pt-5 pb-2 text-muted-foreground">
                Channels
              </p>
              {["general", "spain", "engineering"].map((value) => (
                <a
                  href="#"
                  key={value}
                  className="flex items-center gap-3 rounded-lg py-1 text-muted-foreground transition-all hover:text-primary"
                >
                  <Hash className="h-3 w-3" />
                  {value}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-2 px-4 lg:h-[55px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <a
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Acme Inc</span>
                </a>
                <a
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </a>
                <a
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Orders
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    6
                  </Badge>
                </a>
                <a
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Package className="h-5 w-5" />
                  Products
                </a>
                <a
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Users className="h-5 w-5" />
                  Customers
                </a>
                <a
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Analytics
                </a>
              </nav>
            </SheetContent>
          </Sheet>
          <Button variant="ghost" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
          <ModeToggle />
          <NavigationMenu authRepo={authRepo} />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6"></main>
      </div>
    </div>
  );
}
