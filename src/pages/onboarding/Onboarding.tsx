import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { AuthRepository } from "@/modules/auth/domain";
import { Trans } from "@lingui/macro";
import { useSession } from "../auth/AuthProvider";

export function Onboarding({ authRepo }: { authRepo: AuthRepository }) {
  const { session } = useSession();
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Card className="z-10 mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">
            <Trans>What's your business</Trans>
          </CardTitle>
          <CardDescription>
            <Trans>
              Let's get started by creating your workspace and your profile.
            </Trans>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SelectForm />
        </CardContent>
      </Card>
      <DotBackground />
    </div>
  );
}

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DotBackground } from "../auth/DotBackground";

const FormSchema = z.object({
  name: z.string({ required_error: "We need your name to create a profile" }),
  lastname: z.string({
    required_error: "We need your last name to create a profile"
  }),
  workspace: z.string({ required_error: "Workspace name required" }),
  employees: z
    .boolean({ required_error: "Necessary to select employees" })
    .default(false),
  size: z.number().default(1)
});

export function SelectForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      workspace: undefined,
      employees: false,
      size: 1
    }
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log({ data });
  }

  const employeesValue = form.watch("employees");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fist name</FormLabel>
              <FormControl>
                <Input placeholder="First name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input placeholder="Last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="workspace"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business / workspace name</FormLabel>
              <FormControl>
                <Input placeholder="Awasome Inc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="employees"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center space-x-2">
                  <Label className="mr-auto" htmlFor={field.name}>
                    Do you have employees?
                  </Label>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        {employeesValue && (
          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What's the size of your business</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        )}
        <FormDescription>
          You can always update this in your{" "}
          <a className="text-blue-500 underline" href="/app/settings">
            workspace settings
          </a>
          .
        </FormDescription>
        <FormMessage />
        <Button type="submit">Create my workspace</Button>
      </form>
    </Form>
  );
}
