import { useLoaderData, useParams } from "react-router-dom";

import { useFolders } from "./useFolders";

import { Compress } from "@/components/ui/compress";
import { FoldersSection } from "@/pages/projects/FolderSection";
import { ProjectSection } from "@/pages/projects/ProjectSection";
import { ResourcesTable } from "@/pages/projects/ResourcesTable";
import { ProjectDetail } from "../types";

interface ProjectHomeProps {
  compress?: boolean;
}

export const ProjectHome = ({ compress }: ProjectHomeProps) => {
  const { projectId } = useParams();
  const { data, isLoading } = useFolders(Number(projectId));
  return (
    <Compress useCompress={compress}>
      <ProjectHeader />
      <FoldersSection isLoading={isLoading} data={data?.data ?? []} />
      <ProjectSection title="Files, tasks and more">
        <ResourcesTable projectId={projectId} />
      </ProjectSection>
    </Compress>
  );
};

const ProjectHeader = () => {
  const data = useLoaderData() as ProjectDetail | undefined;
  return (
    <header className="flex items-center gap-2 pb-10">
      <div className="flex text-sm aspect-square size-10 items-center justify-center rounded-full bg-indigo-100 text-sidebar-primary">
        {data?.avatar}
      </div>
      <span className="flex flex-col">
        <p className="leading-5 font-bold text-xl text-primary">{data?.name}</p>
        <p className="text-sm text-muted-foreground">{data?.description}</p>
      </span>
    </header>
  );
};
