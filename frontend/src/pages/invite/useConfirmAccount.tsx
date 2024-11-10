import { useUser } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
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
  const { user } = useUser();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onSubmit"
  });

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: async (data: { name: string; userId: string }) => {
      const toastLoading = toast.loading("Confirming account...");

      const mutatate = await fetch(
        "http://localhost:3000/api/v1/accounts/confirm",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify(data)
        }
      );

      if (mutatate.ok) {
        toast.dismiss(toastLoading);
        toast.success("Account confirmed");
        return navigate("/");
      }

      toast.dismiss(toastLoading);
      toast.error("Something went wrong");
    }
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const name = `${data.name} ${data.lastname}`;

    if (!user?.id) return;

    mutate({ name, userId: user.id });
  }

  return {
    form,
    onSubmit
  };
};
