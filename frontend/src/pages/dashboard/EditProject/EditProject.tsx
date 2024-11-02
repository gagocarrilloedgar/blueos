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

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { useLayoutContext } from "../useLayoutContext";

const ProjecSchema = z.object({
  name: z.string(),
  description: z.string(),
  workedHours: z.coerce.number(),
  clientId: z.coerce.number()
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
  const [showCreateClient, setShowCreateClient] = useState(false);

  const { isPending, mutate: updateProject } = useMutation({
    mutationFn: async (data: z.infer<typeof ProjecSchema>) => {
      const fetchPromise = fetch(
        `http://localhost:3000/api/v1/projects/${projectId}`,
        {
          credentials: "include",
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            id: Number(projectId),
            ...data
          })
        }
      );

      return toast.promise(fetchPromise, {
        loading: "Updating project...",
        success: "Project updated successfully",
        error: "Failed to update project"
      });
    }
  });

  const onSubmit = (data: z.infer<typeof ProjecSchema>) => {
    updateProject(data);
  };

  const { data, isLoading } = useQuery<Project>({
    queryKey: ["projects", projectId && parseInt(projectId, 10)],
    queryFn: () =>
      fetch(`http://localhost:3000/api/v1/projects/${projectId}`, {
        credentials: "include"
      }).then((res) => res.json()),
    enabled: !!projectId
  });

  const { data: clients } = useQuery<Client[]>({
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
  }, [data]);

  const showNoClients = clients?.length === 0;

  const isDirty = form.formState.isDirty;

  if (isLoading)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">
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
                        <SelectItem
                          key={client.id}
                          value={client.id.toString()}
                        >
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                    <FormDescription>
                      {showNoClients
                        ? "You have no clients yet"
                        : "Create a new client below if needed"}
                    </FormDescription>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <CreateNewClient
          noClients={showNoClients}
          showCreateClient={showCreateClient}
          setShowCreateClient={setShowCreateClient}
        />
      </div>
      <SheetFooter className="sticky bottom-4">
        {showCreateClient && (
          <Button onClick={() => setShowCreateClient(false)} variant="outline">
            Cancel
          </Button>
        )}
        <Button
          disabled={isPending || (!isDirty && !showCreateClient)}
          form={showCreateClient ? "create-client-form" : "edit-project-form"}
          type="submit"
        >
          {showCreateClient ? "Create client" : "Save"}
        </Button>
      </SheetFooter>
    </div>
  );
};

const CreateNewClient = ({
  noClients,
  showCreateClient,
  setShowCreateClient
}: {
  noClients: boolean;
  showCreateClient: boolean;
  setShowCreateClient: (show: boolean) => void;
}) => {
  const { activeOrg } = useLayoutContext();
  const queryClient = useQueryClient();

  const form = useForm<{ name: string }>({
    resolver: zodResolver(
      z.object({
        name: z
          .string({
            required_error: "Name is required"
          })
          .min(1, { message: "Name is required" })
      })
    ),
    mode: "onSubmit"
  });

  const clientMutation = useMutation({
    mutationFn: async (data: { name: string; organisationId: number }) => {
      const fetchPromise = fetch(`http://localhost:3000/api/v1/clients`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      return toast.promise(fetchPromise, {
        loading: "Creating client...",
        success: "Client created successfully",
        error: "Failed to create client"
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["clients", activeOrg?.id]
      });
      form.reset();
      setShowCreateClient(false);
    }
  });

  const onSubmit = (data: { name: string }) => {
    if (!activeOrg?.id) return;

    clientMutation.mutate({
      name: data.name,
      organisationId: activeOrg.id
    });
  };

  if (!showCreateClient)
    return (
      <div className="flex flex-col gap-2 items-center">
        <Button
          onClick={() => setShowCreateClient(true)}
          type="button"
          size="sm"
          className="w-full"
          variant="ghost"
        >
          <Plus className="mr-2 w-4 h-4" />
          {noClients ? "Create client" : "New client"}
        </Button>
      </div>
    );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} id="create-client-form">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client name</FormLabel>
              <Input {...field} />
              <FormMessage />
              <FormDescription>
                This client will be created and linked to your organisation. For
                visibility you'll have to assign it to a client portal
              </FormDescription>
            </FormItem>
          )}
        />
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
      </SheetContent>
    </Sheet>
  );
};
