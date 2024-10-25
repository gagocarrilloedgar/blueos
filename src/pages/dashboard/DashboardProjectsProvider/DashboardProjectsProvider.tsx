import { useToast } from "@/hooks/use-toast";
import { createProject as create } from "@/modules/dashboard/application/createProject";
import { getProjects as appGetProjects } from "@/modules/dashboard/application/getProjects";
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
import { useLayoutContext } from "../useLayoutContext";
import { Context } from "./Context";

export const DashboardProjectsProvider = ({
  projectsRepo,
  children
}: PropsWithChildren<{ projectsRepo: ProjectsRepository }>) => {
  const [projects, setProjects] = useState<DashboardProject[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { toast } = useToast();
  const { activeTeam } = useLayoutContext();

  const getProjects = useMemo(
    () => appGetProjects(projectsRepo),
    [projectsRepo]
  );

  const newProject = useMemo(() => create(projectsRepo), [projectsRepo]);

  const loadProjects = useCallback(async () => {
    setLoading(true);
    if (!activeTeam) return;
    const data = await getProjects({ teamId: activeTeam.id });

    if (data.error || !data.projects) {
      setLoading(false);
      return;
    }

    setProjects(data.projects);
  }, [activeTeam, getProjects]);

  useEffect(() => {
    loadProjects()
      .catch(() => {
        setLoading(false);
      })
      .finally(() => setLoading(false));
  }, [loadProjects]);

  const createProject = useCallback(
    async (name?: string) => {
      if (!activeTeam) return;
      if (!name) {
        toast({
          title: "Ups, there's been an error",
          description: "Project name can not be empty",
          variant: "destructive"
        });
        return;
      }

      const resp = await newProject({
        name,
        teamId: activeTeam.id
      });

      if (resp.error) {
        toast({
          title: "Ups, there's been an error",
          description:
            "There's been an error creating the project. Please try again later",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Project created successfully"
      });
    },
    [activeTeam, toast, newProject]
  );

  const value = useMemo(
    () => ({ projects, createProject, loading }),
    [projects, createProject, loading]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
