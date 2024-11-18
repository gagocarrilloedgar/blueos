import { AppSidebar } from "@/components/layout";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";
import { Outlet, UIMatch, useLocation, useMatches } from "react-router-dom";

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
  const matches = useMatches();
  const { pathname } = useLocation();

  const matchedPath = matches.find((item) => item.pathname === pathname) as
    | UIMatch<unknown, { action: React.ReactNode }>
    | undefined;

  return (
    <header className="flex h-16 shrink-0 justify-between items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4 pt-1">
        {!open && (
          <>
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </>
        )}
        <Breadcrumbs />
      </div>
      <span className="px-4">{matchedPath?.handle?.action}</span>
    </header>
  );
};
