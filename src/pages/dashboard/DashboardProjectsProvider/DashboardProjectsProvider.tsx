import { createProject } from "@/modules/dashboard/application/createProject";
import { getProjects } from "@/modules/dashboard/application/getProjects";
import {
  DashboardProject,
  ProjectsRepository
} from "@/modules/dashboard/domain/ProjectsRepository";
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";
import { toast } from "sonner";
import { useLayoutContext } from "../useLayoutContext";
import { Context } from "./Context";

export const DashboardProjectsProvider = ({
  projectsRepo,
  children
}: PropsWithChildren<{ projectsRepo: ProjectsRepository }>) => {
  const [projects, setProjects] = useState<DashboardProject[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { activeTeam } = useLayoutContext();

  const loadProjects = useCallback(async () => {
    if (!activeTeam) return;

    setLoading(true);

    try {
      const data = await getProjects(projectsRepo)({ teamId: activeTeam.id });

      if (data.error || !data.projects) {
        throw new Error("Failed to fetch projects");
      }

      setProjects(data.projects);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  }, [activeTeam, projectsRepo]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const create = useCallback(
    async (name?: string) => {
      if (!activeTeam) return;
      if (!name) {
        toast.error("Ups, there's been an error", {
          description: "Project name can not be empty"
        });
        return;
      }

      const resp = await createProject(projectsRepo)({
        name,
        teamId: activeTeam.id
      });

      if (resp.error) {
        toast.error("Ups, there's been an error", {
          description:
            "There's been an error creating the project. Please try again later"
        });
        return;
      }

      toast.success("Project created successfully");
      // Reload projects after creating a new one
      loadProjects();
    },
    [activeTeam, projectsRepo, loadProjects]
  );

  const value = useMemo(
    () => ({
      projects,
      createProject: create,
      loading: loading && !projects.length
    }),
    [projects, loading, create]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
