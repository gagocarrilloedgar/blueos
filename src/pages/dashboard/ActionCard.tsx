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
import { PropsWithChildren } from "react";

interface ActionCardProps {
  title: string;
  emptyState: string;
  description: string;
  actionLabel?: string;
  placeholder: string;
}

export const ActionCard = ({
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
