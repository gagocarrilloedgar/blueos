import { Button } from "@/components/ui/button";
import { env } from "@/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface RemoveFolderProps {
  folderId: number;
  organizationId: number;
}

export const useRemoveFolder = ({ projectId }: { projectId: number }) => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["folders", "remove"],
    mutationFn: async ({ folderId, organizationId }: RemoveFolderProps) => {
      const loadingToast = toast.loading("Removing folder");
      const res = await fetch(`${env.apiUrl}/folders/${folderId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ organisationId: organizationId })
      });

      toast.dismiss(loadingToast);
      if (!res.ok) {
        throw new Error("Error removing the folder");
      }
    },
    onSuccess() {
      toast.success("Folder removed");
      queryClient.invalidateQueries({
        queryKey: ["folders", "project", projectId]
      });
    },
    onError() {
      toast.error("There was a problem removing your folder");
    }
  });

  const deleteAccount = (props: RemoveFolderProps) => {
    toast("Delete Folder", {
      closeButton: true,
      description: "This action will delete the folder and all its data.",
      action: (
        <Button type="button" size="sm" onClick={() => mutateAsync(props)}>
          Delete
        </Button>
      )
    });
  };

  return {
    removeFolder: deleteAccount,
    isPending
  };
};
