import { env } from "@/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UpdateFolderProps {
  folderId: number;
  name: string;
  organizationId: number;
}

export const useEditFolderName = ({ projectId }: { projectId: number }) => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async ({
      folderId,
      name,
      organizationId
    }: UpdateFolderProps) => {
      const loadingToast = toast.loading("Updating folder...");
      const res = await fetch(`${env.apiUrl}/folders/${folderId}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, folderId, organisationId: organizationId })
      });

      toast.dismiss(loadingToast);
      if (!res.ok) {
        throw new Error("Error updating the folder");
      }
    },
    onSuccess() {
      toast.success("Folder updated");
      queryClient.invalidateQueries({
        queryKey: ["folders", "project", projectId]
      });
    },
    onError() {
      toast.error("There was a problem updating your folder");
    }
  });

  return {
    updateFolder: mutateAsync,
    isPending
  };
};
