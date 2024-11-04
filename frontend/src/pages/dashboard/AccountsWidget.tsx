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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowUpRight, Trash } from "lucide-react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../auth/AuthProvider";
import { useDashboardProjects } from "./DashboardProjectsProvider/useDashboardProjects";

export const AccountsWidget = () => {
  const { accounts, loading } = useDashboardProjects();
  const { account } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);

  const actionLabel = "Create";
  const title = "Organisation members";
  const placeholder = "a@example.com";
  const emptyState = "There are no organisation members";
  const description = "Invite new organisation members to collaborate";
  const queryClient = useQueryClient();

  const { mutate: inviteUser } = useMutation({
    mutationFn: async (email: string) => {
      const fetchPromise = fetch(
        `http://localhost:3000/api/v1/accounts/invite`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email })
        }
      );

      return toast.promise(fetchPromise, {
        loading: "Inviting user...",
        success: "User invited successfully",
        error: async (error) => {
          if (error.includes("422")) return "The email is already in use";

          return "Failed to invite user";
        }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts", "dashboard"] });
    }
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = inputRef?.current?.value;

    if (!email || !isValidEmail(email)) {
      toast.error("Please provide a valid email");
      return;
    }

    inviteUser(email);
  };

  const isEmpty = !accounts?.length;

  const canDeleteAccount = (accountName: string) => {
    return accountName !== account?.name;
  };

  const navigate = useNavigate();
  const goToAccounts = () => navigate("/accounts");

  return (
    <Card>
      <CardHeader className="flex flex-row">
        <span>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </span>
        <Tooltip>
          <TooltipTrigger className="ml-auto">
            <Button size="icon" variant="ghost" onClick={goToAccounts}>
              <ArrowUpRight className="h-4 w-4" />
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
          {accounts?.map(({ name, avatar, createdAt }, index) => {
            return (
              <Card key={`${name}-${index}`}>
                <div className="flex flew-row gap-2 px-3 py-2 items-center w-full">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback
                      className={`uppercase ${getRandomPastelColor()}`}
                    >
                      {avatar}
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
                        <Button
                          disabled={!canDeleteAccount(name)}
                          type="button"
                          size="icon"
                          variant="ghost"
                        >
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

const isValidEmail = (email: string) => {
  return email
    .trim()
    .toLowerCase()
    .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
};
