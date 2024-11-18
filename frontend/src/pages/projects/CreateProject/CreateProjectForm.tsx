import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { SheetFooter } from "@/components/ui/sheet";

import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { CreateNewClient } from "@/pages/projects/components";

import { Client, ProjecSchema } from "./types";

interface CreateProjectFormProps {
  showNoClients: boolean;
  showCreateClient: boolean;
  form: UseFormReturn<z.infer<typeof ProjecSchema>>;
  clients?: Client[];
  setShowCreateClient: (val: boolean) => void;
  onSubmit: () => void;
}

export const CreateProjectForm = ({
  form,
  onSubmit,
  showNoClients,
  showCreateClient,
  setShowCreateClient,
  clients
}: CreateProjectFormProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        <Form {...form}>
          <form
            id="edit-project-form"
            onSubmit={onSubmit}
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
      <SheetFooter className="sticky bottom-4"></SheetFooter>
    </div>
  );
};
