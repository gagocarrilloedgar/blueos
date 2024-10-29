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
import { getRandomPastelColor } from "@/lib/getRandomPastelColor";
import { getTeamInitials } from "@/modules/sidebar/domain/SidebarRepository";
import { ArrowUpRight, Trash } from "lucide-react";
import { useRef } from "react";
import { useDashboardProjects } from "./DashboardProjectsProvider/useDashboardProjects";

export const AccountsWidget = () => {
  const { accounts, loading } = useDashboardProjects();
  const inputRef = useRef<HTMLInputElement>(null);

  const actionLabel = "Create";
  const title = "Organisation members";
  const placeholder = "a@example.com";
  const emptyState = "There are no organisation members";
  const description = "Invite new organisation members to collaborate";

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = inputRef?.current?.value;

    await console.log(name);
  };

  const isEmpty = !accounts?.length;

  return (
    <Card>
      <CardHeader className="flex flex-row">
        <span>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </span>
        <Tooltip>
          <TooltipTrigger className="ml-auto">
            <Button size="icon" variant="ghost" asChild>
              <a href="/projects">
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </Button>
          </TooltipTrigger>
          <TooltipContent>See all accounts</TooltipContent>
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
          {accounts?.map(({ name, createdAt }, index) => {
            return (
              <Card key={`${name}-${index}`}>
                <div className="flex flew-row gap-2 px-3 py-2 items-center w-full">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback
                      className={`uppercase ${getRandomPastelColor()}`}
                    >
                      {getTeamInitials(name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm overflow-hidden whitespace-nowrap overflow-ellipsis">
                      {name}
                    </p>
                    <p className="text-xs overflow-hidden text-muted-foreground whitespace-nowrap overflow-ellipsis">{`Active since: ${createdAt}`}</p>
                  </div>
                  <span className="flex ml-auto gap-1">
                    <Tooltip>
                      <TooltipTrigger>
                        <Button type="button" size="icon" variant="ghost">
                          <Trash className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Remove from the team</TooltipContent>
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
              name="dashboard-account-name"
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
