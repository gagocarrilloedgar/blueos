import { env } from "@/config";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateFolder = () => {
  const { isPending, isError, mutateAsync } = useMutation({
    mutationKey: ["folders"],
    mutationFn: async (data: {
      organisationId: number;
      name: string;
      projectId: number;
    }) => {
      const loadingToast = toast.loading("Deleting account...");

      const res = await fetch(`${env.apiUrl}/folders`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      toast.dismiss(loadingToast);

      if (!res.ok) return toast.error("Error creating the Folder");

      toast.success("Folder created");
    }
  });

  return {
    isPending,
    isError,
    mutateAsync
  };
};
