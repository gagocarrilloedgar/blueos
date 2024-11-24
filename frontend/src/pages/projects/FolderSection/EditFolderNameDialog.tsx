import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

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

interface EditFolderNameDialogProps extends DialogProps {
  folderName: string;
  folderId: number;
  isPending?: boolean;
  cbk: (name: string, id: number) => void;
}

export const EditFolderNameDialog = ({
  open,
  folderName,
  folderId,
  isPending,
  cbk,
  onOpenChange
}: EditFolderNameDialogProps) => {
  const { projectId } = useParams();
  const { activeOrg } = useLayoutContext();
  const [value, setValue] = useState<string>(folderName);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!value) return toast.error("The name can't be blank");

    if (!activeOrg || !projectId) return;

    cbk(value, folderId);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form id="update-folder-form" onSubmit={onSubmit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit folder {folderName}</DialogTitle>
            <DialogDescription>Edit your forlder name</DialogDescription>
          </DialogHeader>
          <div>
            <Label htmlFor="folder-name">Folder name</Label>
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              defaultValue={folderName}
              disabled={isPending}
              alt="update-project-folder-name"
              id="folder-name"
              placeholder="Eg: My usefull new folder"
            />
          </div>
          <DialogFooter>
            <Button
              disabled={isPending}
              form="update-folder-form"
              size="sm"
              type="submit"
            >
              Update folder
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
