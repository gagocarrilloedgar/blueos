import { Button, ButtonProps } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger
} from "@/components/ui/tooltip";
import { } from "@radix-ui/react-tooltip";
import {
    Edit,
    FilePlus,
    FolderPlusIcon,
    Share2,
    Trash,
    UploadCloud
} from "lucide-react";
import { PropsWithChildren, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CreateFolderDialog } from "./CreateFolderDialog";

export const ProjectHomeActions = () => {
  const { projectId } = useParams();
  const [openNewFolder, setOpenNewFolder] = useState(false);
  return (
    <>
      <section className="flex items-center gap-2">
        <TooltipIconButton label="Edit project" asChild>
          <Link to={`/projects/${projectId}/edit`}>
            <Edit className="w-4 h-4" />
          </Link>
        </TooltipIconButton>
        <TooltipIconButton label="Share project">
          <Share2 className="w-4 h-4" />
        </TooltipIconButton>
        <TooltipIconButton
          label="New folder"
          onClick={() => setOpenNewFolder(true)}
        >
          <FolderPlusIcon className="w-4 h-4" />
        </TooltipIconButton>
        <TooltipIconButton label="New document">
          <FilePlus className="w-4 h-4" />
        </TooltipIconButton>
        <TooltipIconButton label="Upload files">
          <UploadCloud className="w-4 h-4" />
        </TooltipIconButton>
        <TooltipIconButton label="Remove project">
          <Trash className="w-4 h-4" />
        </TooltipIconButton>
      </section>
      <CreateFolderDialog
        open={openNewFolder}
        onOpenChange={setOpenNewFolder}
      />
    </>
  );
};

interface TooltipIconButtonProps extends ButtonProps {
  label: string;
}
const TooltipIconButton = ({
  children,
  label,
  ...props
}: PropsWithChildren<TooltipIconButtonProps>) => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Button variant="ghost" size="icon" className="w-6 h-6" {...props}>
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
};
