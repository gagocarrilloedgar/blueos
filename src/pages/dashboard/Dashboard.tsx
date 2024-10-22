import { AppSidebar } from "@/components/layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { Trans } from "@lingui/macro";
import { PropsWithChildren } from "react";
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
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
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
  if (pathname === "/app" && account)
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

export const Skeletons = () => {
  return (
    <div className="pt-2">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <ActionCard
          title="Projects"
          placeholder="Project name"
          emptyState="You haven't created any project yet"
          description="List of last updated projects"
        />
        <ActionCard
          title="Team members"
          placeholder="a@example.com"
          emptyState="There are no team members"
          description="Invite new team members to collaborate"
        />
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </div>
  );
};

interface ActionCardProps {
  title: string;
  emptyState: string;
  description: string;
  actionLabel?: string;
  placeholder: string;
}

const ActionCard = ({
  title,
  description,
  emptyState,
  placeholder,
  actionLabel = "Create",
  children
}: PropsWithChildren<ActionCardProps>) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <section className="flex flex-col items-center pt-1 pb-4">
          <p className="text-sm text-muted-foreground text-center">
            {emptyState}
          </p>
        </section>
        {children}
        <Separator />
        <div className="flex flex-row gap-2 pt-4">
          <Input className="h-8" placeholder={placeholder} />
          <Button size="sm">
            <Trans>{actionLabel}</Trans>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
