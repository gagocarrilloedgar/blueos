import { Button } from "@/components/ui/button";
import { env } from "@/config/env";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useRemoveAccount = () => {
  const { mutate: confirmDelete } = useMutation({
    mutationKey: ["accounts", "confirmDelete"],
    mutationFn: async (accountId: number) => {
      const loadingToast = toast.loading("Deleting account...");

      const res = await fetch(`${env.apiUrl}/accounts/${accountId}`, {
        method: "DELETE",
        credentials: "include"
      });

      toast.dismiss(loadingToast);

      if (res.ok) return toast.success("Account deleted successfully");

      toast.error("Failed to delete account");
    }
  });

  const deleteAccount = (accountId: number) => {
    toast("Delete account", {
      closeButton: true,
      description: "This action will delete the account and all its data.",
      action: (
        <Button
          type="button"
          size="sm"
          onClick={() => confirmDelete(accountId)}
        >
          Delete
        </Button>
      )
    });
  };

  return { deleteAccount };
};
