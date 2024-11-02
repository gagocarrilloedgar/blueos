import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useOnboardingContext } from "./useOnboardingContext";

const validName = (error: string) =>
  z.string().min(2, error + ". Must have at least 3 letters");

const FormSchema = z.object({
  name: validName("We need your name to create a profile"),
  lastname: validName("We need your last name to create a profile"),
  organisation: validName("Workspace name required")
  // teamAccounts: z.array(z.object({ email: z.string().email() })),
  // size: z.number().default(1)
});

export const useCreateOnboarding = () => {
  const { createAccount } = useOnboardingContext();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onSubmit"
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await createAccount(data.name, data.lastname, data.organisation);
  }

  return {
    form,
    onSubmit
  };
};
