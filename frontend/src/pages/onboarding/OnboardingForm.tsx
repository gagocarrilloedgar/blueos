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
import { Trans } from "@lingui/macro";
import { Link } from "react-router-dom";
import { useCreateOnboarding } from "./useCreateOnboarding";

export function OnboardingForm() {
  const { onSubmit, form } = useCreateOnboarding();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
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
        <FormField
          control={form.control}
          name="organisation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workspace name</FormLabel>
              <FormControl>
                <Input placeholder="Awasome Inc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/*<p className="font-semibold">
          <Trans>Team members</Trans>
        </p>*/}
        {/*fields.map((field, index) => {
          return (
            <FormField
              key={field.id}
              control={form.control}
              name={`teamAccounts.${index}.email`}
              render={() => (
                <FormItem>
                  <FormControl>
                    <div className="flex w-full items-center space-x-2">
                      <Input
                        placeholder="inc@example.com"
                        {...form.register(`teamAccounts.${index}.email`)}
                      />
                      <Button
                        className="text-muted-foreground"
                        variant="ghost"
                        onClick={() => remove(index)}
                        size="icon"
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })*/}

        {/*<Button
          variant="outline"
          onClick={addEmptyMember}
          type="button"
          className=" w-full border-dashed text-muted-foreground"
        >
          <Plus className="mr-2 w-5 h-5" />
          Add team member
        </Button>*/}
        <FormDescription>
          You can always update this in your{" "}
          <Link className="text-blue-500 underline" to="/settings">
            workspace settings
          </Link>
        </FormDescription>
        <FormMessage />
        <Button type="submit">Create my workspace</Button>
      </form>
    </Form>
  );
}
