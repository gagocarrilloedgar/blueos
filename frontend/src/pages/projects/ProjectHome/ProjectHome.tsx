import { useParams } from "react-router-dom";

import { useFolders } from "./useFolders";

import { FoldersSection } from "@/pages/projects/FolderSection";
import { ProjectSection } from "@/pages/projects/ProjectSection";
import { ResourcesTable } from "@/pages/projects/ResourcesTable";

export const ProjectHome = () => {
  const { projectId } = useParams();
  const { data, isLoading } = useFolders(Number(projectId));
  return (
    <div className="mx-auto">
      <ProjectHeader />
      <FoldersSection isLoading={isLoading} data={data?.data ?? []} />
      <ProjectSection title="Files, tasks and more">
        <ResourcesTable projectId={projectId} />
      </ProjectSection>
    </div>
  );
};

const ProjectHeader = () => {
  return (
    <header className="flex items-center gap-2 pb-10">
      <div className="flex text-sm aspect-square size-10 items-center justify-center rounded-full bg-indigo-100 text-sidebar-primary">
        P
      </div>
      <span className="flex flex-col">
        <p className="leading-5 font-bold text-xl text-primary">Title</p>
        <p className="text-sm text-muted-foreground">
          Here's an onverview of your projects
        </p>
      </span>
    </header>
  );
};
