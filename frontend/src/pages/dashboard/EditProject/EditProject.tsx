import { Button } from "@/components/ui/button";
import {
    Form,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/loader";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet";
import { zodResolver } from "@hookform/resolvers/zod";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { useLayoutContext } from "../useLayoutContext";

const ProjecSchema = z.object({
  name: z.string(),
  description: z.string(),
  workedHours: z.number(),
  clientId: z.number()
});

type Client = {
  id: number;
  name: string;
};

type Project = z.infer<typeof ProjecSchema> & {
  id: number;
  client: Client;
};

export const EditProject = () => {
  return (
    <EditProjectLayout>
      <EditProjectForm />
    </EditProjectLayout>
  );
};

const EditProjectForm = () => {
  const { projectId } = useParams();
  const { activeOrg } = useLayoutContext();

  const onSubmit = (data: z.infer<typeof ProjecSchema>) => {
    console.log(data);
  };

  const { data, isLoading } = useQuery<Project>({
    queryKey: ["projects", projectId && parseInt(projectId, 10)],
    queryFn: () =>
      fetch(`http://localhost:3000/api/v1/projects/${projectId}`, {
        credentials: "include"
      }).then((res) => res.json()),
    enabled: !!projectId
  });

  const { data: clients } = useQuery({
    queryKey: ["clients", activeOrg?.id],
    queryFn: () =>
      fetch(
        `http://localhost:3000/api/v1/clients/organisation/${activeOrg?.id}`,
        {
          credentials: "include"
        }
      ).then((res) => res.json()),
    enabled: !!activeOrg?.id
  });

  const form = useForm<z.infer<typeof ProjecSchema>>({
    resolver: zodResolver(ProjecSchema),
    mode: "onSubmit"
  });

  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name,
        description: data.description,
        workedHours: data.workedHours,
        clientId: data.client?.id
      });
    }
  }, [data?.name]);

  const showNoClients = clients?.length === 0;

  console.log(clients);

  if (isLoading)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <Form {...form}>
      <form
        id="edit-project-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-4 py-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <Input {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <Input {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="workedHours"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Worked hours</FormLabel>
              <Input type="number" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="clientId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value?.toString()}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a client" />
                </SelectTrigger>
                <SelectContent>
                  {clients?.map((client: Client) => (
                    <SelectItem key={client.id} value={client.id.toString()}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
                <FormDescription>
                  {showNoClients && "You have no clients yet"}
                </FormDescription>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {showNoClients && (
          <div className="flex flex-col gap-2 items-center">
            <Button type="button" size="sm" className="w-full" variant="ghost">
              Create client
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
};

const EditProjectLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <Sheet open={true} onOpenChange={goBack}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit project</SheetTitle>
          <SheetDescription>
            Change the main details of your project here.
          </SheetDescription>
        </SheetHeader>
        {children}
        <SheetFooter>
          <Button form="edit-project-form" type="submit">
            Save
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
