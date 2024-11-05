import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/clerk-react";
import { Trans } from "@lingui/macro";
import { ConfirmationAccount } from "../auth/AuthProvider/AuthContext";
import { useConfirmAccount } from "./useConfirmAccount";

export function ConfirmationForm({
  confirmationAccount
}: {
  confirmationAccount: ConfirmationAccount | null;
}) {
  const { onSubmit, form } = useConfirmAccount();
  const { user } = useUser();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={() => (
            <FormItem>
              <FormLabel>
                <Trans>Email</Trans>
              </FormLabel>
              <FormControl>
                <Input
                  disabled
                  placeholder="Email"
                  value={user?.emailAddresses[0].emailAddress}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="organisationName"
          render={() => (
            <FormItem>
              <FormLabel>
                <Trans>Organisation</Trans>
              </FormLabel>
              <FormControl>
                <Input
                  disabled
                  placeholder="Organisation"
                  value={confirmationAccount?.organisationName}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Trans>Fist name</Trans>
              </FormLabel>
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
              <FormLabel>
                <Trans>Last name</Trans>
              </FormLabel>
              <FormControl>
                <Input placeholder="Last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormMessage />
        <Button type="submit">Join organization</Button>
      </form>
    </Form>
  );
}
