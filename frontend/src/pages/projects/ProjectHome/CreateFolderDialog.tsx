import { DialogProps } from "@radix-ui/react-dialog";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLayoutContext } from "@/pages/dashboard/useLayoutContext";
import { useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useCreateFolder } from "./useCreateFolder";

interface CreateFolderDialogProps extends DialogProps {}
export const CreateFolderDialog = ({
  open,
  onOpenChange
}: CreateFolderDialogProps) => {
  const { projectId } = useParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const { isPending, mutateAsync } = useCreateFolder();
  const { activeOrg } = useLayoutContext();
  const queryClient = useQueryClient();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = inputRef.current?.value;

    if (!name) return toast.error("The name can't be blank");

    if (!activeOrg || !projectId) return;
    await mutateAsync({
      organisationId: activeOrg.id,
      name,
      projectId: Number(projectId)
    });
    queryClient.invalidateQueries({
      queryKey: ["folders", "project", Number(projectId)]
    });
    onOpenChange && onOpenChange(false);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form id="create-folder-form" onSubmit={onSubmit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new folder</DialogTitle>
            <DialogDescription>
              This will create a new folder in your project's root.
            </DialogDescription>
          </DialogHeader>
          <div>
            <Label htmlFor="folder-name">Folder name</Label>
            <Input
              ref={inputRef}
              disabled={isPending}
              alt="project-folder-name"
              id="folder-name"
              placeholder="Eg: My usefull new folder"
            />
          </div>
          <DialogFooter>
            <Button
              disabled={isPending}
              form="create-folder-form"
              size="sm"
              type="submit"
            >
              Create folder
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
