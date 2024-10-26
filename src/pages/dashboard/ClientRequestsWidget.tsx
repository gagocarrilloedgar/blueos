import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export const ClientRequests = () => {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>Client requests</CardTitle>
        <CardDescription>
          Create forms and send then to your clients to get started
        </CardDescription>
      </CardHeader>
      <CardContent className="my-auto">
        <p className="text-sm text-muted-foreground text-center">
          You don't have client requests yet
        </p>
      </CardContent>
    </Card>
  );
};
