import { ProjectSection } from "@/pages/projects/ProjectSection";
import { Folders } from "@/pages/projects/types";

import { FolderCard } from "./FolderCard";
import { FoldersSkeletons } from "./FoldersSkeletons";

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
        {data?.map((folder) => {
          return (
            <FolderCard
              key={`${folder.id}-${folder.name}`}
              name={folder.name}
              id={folder.id}
            />
          );
        })}
      </div>
    </ProjectSection>
  );
};
