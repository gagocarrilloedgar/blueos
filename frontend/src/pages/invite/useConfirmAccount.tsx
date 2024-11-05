import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const validName = (error: string) =>
  z.string().min(2, error + ". Must have at least 3 letters");

const FormSchema = z.object({
  email: z.string().optional(),
  organisationName: z.string().optional(),
  name: validName("We need your name to create a profile"),
  lastname: validName("We need your last name to create a profile")
});

export const useConfirmAccount = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onSubmit"
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return {
    form,
    onSubmit
  };
};
