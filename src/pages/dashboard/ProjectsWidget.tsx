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
import { Trans } from "@lingui/macro";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { getTeamInitials } from "@/modules/sidebar/domain/SidebarRepository";
import { ArrowUpRight, ChevronRight, Edit } from "lucide-react";
import { useRef } from "react";
import { useDashboardProjects } from "./DashboardProjectsProvider/useDashboardProjects";

export const ProjectsWidget = () => {
  const { projects, loading, createProject } = useDashboardProjects();
  const inputRef = useRef<HTMLInputElement>(null);

  const title = "Projects";
  const placeholder = "Project name";
  const emptyState = "You haven't created any project yet";
  const description = "List of 4 last updated projects";
  const actionLabel = "Create";

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = inputRef?.current?.value;

    await createProject(name);
  };

  const isEmpty = !projects?.length;

  return (
    <Card>
      <CardHeader className="flex flex-row items-start">
        <span>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </span>
        <Tooltip>
          <TooltipTrigger>
            <Button size="icon" variant="ghost" className="ml-auto" asChild>
              <a href="/projects">
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </Button>
          </TooltipTrigger>
          <TooltipContent>See all projects</TooltipContent>
        </Tooltip>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          {loading &&
            new Array(4)
              .fill("")
              .map((_, index) => (
                <Skeleton key={index} className="w-full h-10" />
              ))}
        </div>
        {isEmpty && !loading && (
          <section className="flex flex-col items-center pt-1 pb-4">
            <p className="text-sm text-muted-foreground text-center">
              {emptyState}
            </p>
          </section>
        )}
        <section className="flex flex-col pb-4 gap-2">
          {projects?.map(({ name }, index) => {
            return (
              <Card key={`${name}-${index}`}>
                <div className="flex flew-row gap-2 px-3 py-2 items-center w-full">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="uppercase">
                      {getTeamInitials(name)}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-sm overflow-hidden whitespace-nowrap overflow-ellipsis">
                    {name}
                  </p>
                  <span className="flex ml-auto gap-1">
                    <Tooltip>
                      <TooltipTrigger>
                        <Button type="button" size="icon" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Edit</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button type="button" size="icon" variant="ghost">
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Open</TooltipContent>
                    </Tooltip>
                  </span>
                </div>
              </Card>
            );
          })}
        </section>
        <Separator />
        <form onSubmit={onSubmit}>
          <div className="flex flex-row gap-2 pt-4">
            <Input
              ref={inputRef}
              name="dashboard-project-name"
              type="text"
              className="h-8"
              placeholder={placeholder}
            />
            <Button type="submit" size="sm">
              <Trans>{actionLabel}</Trans>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
