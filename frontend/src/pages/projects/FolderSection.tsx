import { Trans } from "@lingui/macro";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Edit, FolderIcon, Trash } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";

import { ProjectSection } from "@/pages/projects/ProjectSection";
import { Folders } from "@/pages/projects/types";

export const FoldersSection = ({
  isLoading,
  data
}: {
  isLoading: boolean;
  data?: Folders[];
}) => {
  return (
    <ProjectSection title="Folders">
      <div className="grid grid-cols-4 gap-2">
        {isLoading && <FoldersSkeletons />}
        {data?.map((folder) => (
          <FolderCard key={folder.id} name={folder.name} id={folder.id} />
        ))}
      </div>
    </ProjectSection>
  );
};

const FoldersSkeletons = () => {
  return Array.from({ length: 8 }).map((_, index) => (
    <Skeleton key={index} className="h-10 w-full" />
  ));
};

const FolderCard = ({ name, id }: { name: string; id: number }) => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  return (
    <div className="flex gap-2 border rounded-md px-1 py-0.5 justify-between ">
      <button
        onClick={() => navigate(`/projects/${projectId}/folders/${id}`)}
        className="flex justify-start items-center px-1 gap-2 text-xs font-medium w-full cursor-pointer hover:bg-inherit"
      >
        <FolderIcon className="h-4 w-4" />
        {name}
      </button>
      <FolderEditMenu name={name} />
    </div>
  );
};

const FolderEditMenu = ({ name }: { name: string }) => {
  return (
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
        <DropdownMenuItem>
          <Edit className="mr-2 w-4 h-4" />
          <Trans>Edit</Trans>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Trash className="mr-2 w-4 h-4" />
          <Trans>Delete</Trans>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
