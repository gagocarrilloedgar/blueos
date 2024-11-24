import { Trans } from "@lingui/macro";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Edit, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useLayoutContext } from "@/pages/dashboard/useLayoutContext";
import { useCallback, useState } from "react";
import { EditFolderNameDialog } from "./EditFolderNameDialog";
import { useEditFolderName } from "./useEditFolderName";
import { useRemoveFolder } from "./useRemoveFolder";

interface FolderEditMenu {
  name: string;
  id: number;
  projectId: number;
}
export const FolderEditMenu = ({ name, id, projectId }: FolderEditMenu) => {
  const { activeOrg } = useLayoutContext();
  const [open, setOpen] = useState(false);
  const { isPending, removeFolder } = useRemoveFolder({ projectId });

  const { isPending: pendingUpdate, updateFolder } = useEditFolderName({
    projectId: Number(projectId)
  });

  const onSubmitEdit = useCallback(
    async (folderName: string, folderId: number) => {
      await updateFolder({
        organizationId: activeOrg?.id!,
        name: folderName,
        folderId: folderId
      });
      setOpen(false);
    },
    [activeOrg?.id, id]
  );

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button type="button" size="icon" variant="ghost">
            <DotsVerticalIcon className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <p className="text-sm font-semibold">{name}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            disabled={pendingUpdate}
            onClick={() => setOpen(true)}
          >
            <Edit className="mr-2 w-4 h-4" />
            <Trans>Edit</Trans>
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={isPending}
            onClick={() =>
              removeFolder({ folderId: id, organizationId: activeOrg?.id! })
            }
          >
            <Trash className="mr-2 w-4 h-4" />
            <Trans>Delete</Trans>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {open && (
        <EditFolderNameDialog
          folderName={name}
          folderId={id}
          isPending={pendingUpdate}
          cbk={onSubmitEdit}
          onOpenChange={setOpen}
          open={open}
        />
      )}
    </>
  );
};
