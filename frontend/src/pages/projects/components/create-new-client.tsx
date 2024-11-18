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
import { zodResolver } from "@hookform/resolvers/zod";

import { env } from "@/config/env";
import { useLayoutContext } from "@/pages/dashboard/useLayoutContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const CreateNewClient = ({
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
      const fetchPromise = fetch(`${env.apiUrl}/clients`, {
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
