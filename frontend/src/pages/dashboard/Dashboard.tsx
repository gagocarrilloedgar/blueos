import { AppSidebar } from "@/components/layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";
import { Trans } from "@lingui/macro";
import { Outlet, useLocation, useMatches, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SidebarHeader />
        <div className="p-4 h-full">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

const SidebarHeader = () => {
  const { open } = useSidebar();

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4 pt-1">
        {!open && (
          <>
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </>
        )}
        <Breadcrumbs />
      </div>
    </header>
  );
};

const Breadcrumbs = () => {
  const { pathname } = useLocation();
  const matches = useMatches();
  const { account } = useAuth();
  const navigate = useNavigate();

  const isMorning = new Date().getHours() <= 12;
  const title = isMorning ? "Morning" : "Hello" + " " + account?.name;

  const breadcrumbs = matches
    .filter((match: any) => match.handle?.crumb)
    .map((match: any) => {
      const breadcrumb = match.handle.crumb(match.data, match.params);
      return {
        label: breadcrumb?.label || "",
        href: breadcrumb?.href || match.pathname
      };
    });

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
        {breadcrumbs.map((breadcrumb, index) => (
          <div
            key={breadcrumb.href}
            className="inline-flex items-center gap-1.5"
          >
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink
                onClick={() => {
                  navigate(breadcrumb.href);
                }}
                className="capitalize"
              >
                {breadcrumb.label}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index !== breadcrumbs.length - 1 && (
              <BreadcrumbSeparator className="hidden md:block" />
            )}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const generateBreadcrumbs = (pathname: string) => {
  const paths = pathname.split("/").filter(Boolean);

  const breadcrumbs = paths.map((path, index) => {
    const href = paths.slice(0, index + 1).join("/");
    return {
      href,
      label: path
    };
  });

  return breadcrumbs;
};
