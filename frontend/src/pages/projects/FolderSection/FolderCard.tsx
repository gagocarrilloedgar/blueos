import { useNavigate, useParams } from "react-router-dom";

import { FolderIcon } from "lucide-react";
import { FolderEditMenu } from "./FolderEditMenu";

export const FolderCard = ({ name, id }: { name: string; id: number }) => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  return (
    <div
      key={id + "-" + name}
      className="flex gap-2 border rounded-md px-1 py-0.5 justify-between "
    >
      <button
        onClick={() => navigate(`/projects/${projectId}/folders/${id}`)}
        className="flex justify-start items-center px-1 gap-2 text-xs font-medium w-full cursor-pointer hover:bg-inherit"
      >
        <FolderIcon className="h-4 w-4" />
        {name}
      </button>
      <FolderEditMenu
        key={id}
        id={id}
        projectId={Number(projectId)}
        name={name}
      />
    </div>
  );
};
