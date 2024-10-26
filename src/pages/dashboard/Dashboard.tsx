import { AppSidebar } from "@/components/layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { Trans } from "@lingui/macro";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumbs />
          </div>
        </header>
        <div className="p-4 h-full">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

const Breadcrumbs = () => {
  const { pathname } = useLocation();
  const { account } = useAuth();
  const isMorning = new Date().getHours() <= 12;
  const title = isMorning ? "Morning" : "Hello" + " " + account?.name;
  if (pathname === "/" && account)
    return (
      <div className="flex items-center gap-2">
        <div className="flex text-sm aspect-square size-9 items-center justify-center rounded-full bg-indigo-100 text-sidebar-primary">
          {account.initials}
        </div>
        <span className="flex flex-col">
          <p className="leading-5 font-bold text-lg text-primary">{title}</p>
          <p className="text-sm text-muted-foreground">
            <Trans>Here's an onverview of your projects</Trans>
          </p>
        </span>
      </div>
    );
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage>Data Fetching</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
