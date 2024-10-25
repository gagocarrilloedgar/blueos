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

import { Skeleton } from "@/components/ui/skeleton";
import { useRef } from "react";
import { useDashboardProjects } from "./DashboardProjectsProvider/useDashboardProjects";

export const ProjectsWidget = () => {
  const { projects, loading, createProject } = useDashboardProjects();
  const inputRef = useRef<HTMLInputElement>(null);

  const title = "Projects";
  const placeholder = "Project name";
  const emptyState = "You haven't created any project yet";
  const description = "List of last updated projects";
  const actionLabel = "Create";

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = inputRef?.current?.value;

    await createProject(name);
  };

  const isEmpty = !projects?.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
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
          <section className="pb-4">
            {projects?.map(({ name }, index) => {
              return (
                <Card key={`${name}-${index}`}>
                  <CardContent>{name}</CardContent>
                </Card>
              );
            })}
          </section>
          <Separator />
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
