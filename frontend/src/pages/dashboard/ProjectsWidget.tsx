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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { getInitials } from "@/lib/getInitials";
import { getRandomPastelColor } from "@/lib/getRandomPastelColor";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { ArrowUpRight, Edit, Trash } from "lucide-react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDashboard } from "./DashboardProvider/useDashboard";

export const ProjectsWidget = () => {
  const { projects, loading, createProject } = useDashboard();
  const navigate = useNavigate();
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
      <CardHeader className="flex flex-row">
        <span>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </span>
        <Tooltip>
          <TooltipTrigger className="ml-auto">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => navigate("/projects")}
            >
              <ArrowUpRight className="h-4 w-4" />
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
          {projects?.map(({ id, name }, index) => {
            return (
              <Card key={`${name}-${index}`}>
                <div className="flex flew-row gap-2 px-3 py-2 items-center w-full">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback
                      className={`uppercase ${getRandomPastelColor()}`}
                    >
                      {getInitials(name)}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-sm overflow-hidden whitespace-nowrap overflow-ellipsis">
                    {name}
                  </p>
                  <span className="flex ml-auto gap-1">
                    <Tooltip>
                      <TooltipTrigger>
                        <Button type="button" size="icon" variant="ghost">
                          <ProjectEditMenu name={name} id={id} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Project options</TooltipContent>
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

const ProjectEditMenu = ({ name, id }: { name: string; id: number }) => {
  const { deleteProject } = useDashboard();
  const navigate = useNavigate();

  const onDelete = async () => await deleteProject(id);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button type="button" size="icon" variant="ghost">
          <DotsVerticalIcon className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <p className="text-sm font-semibold">{name}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate(`/edit-project/${id}`)}>
          <Edit className="mr-2 w-4 h-4" />
          <Trans>Edit</Trans>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete}>
          <Trash className="mr-2 w-4 h-4" />
          <Trans>Delete</Trans>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
