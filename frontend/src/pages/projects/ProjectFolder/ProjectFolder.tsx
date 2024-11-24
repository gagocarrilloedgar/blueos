import { useParams } from "react-router-dom";

import { FoldersSection } from "../FolderSection";
import { ProjectSection } from "../ProjectSection";
import { ResourcesTable } from "../ResourcesTable";
import { useNestedFolders } from "./useNestedFolders";

export const ProjectFolder = () => {
  const { folderId, projectId } = useParams();
  const { data, isLoading } = useNestedFolders(
    Number(projectId),
    Number(folderId)
  );

  return (
    <div className="mx-auto">
      <FoldersSection isLoading={isLoading} data={data?.data ?? []} />
      <ProjectSection title="Files and taks">
        <ResourcesTable projectId={projectId} folderId={folderId} />
      </ProjectSection>
    </div>
  );
};
