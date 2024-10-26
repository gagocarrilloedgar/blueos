import { createProject } from "@/modules/dashboard/application/createProject";
import { getProjects } from "@/modules/dashboard/application/getProjects";
import { getTeamDashboardAccounts } from "@/modules/dashboard/application/getTeamDashboardAccount";
import {
  DashboardProject,
  ProjectsRepository,
  TeamAccount
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
  const [accounts, setAccounts] = useState<TeamAccount[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { activeTeam } = useLayoutContext();

  const loadProjects = useCallback(async () => {
    if (!activeTeam) return;

    setLoading(true);

    try {
      const accountsPromise = getTeamDashboardAccounts(projectsRepo)({
        teamId: activeTeam.id
      });
      const projectsPromise = getProjects(projectsRepo)({
        teamId: activeTeam.id
      });

      const [projectsData, accountsData] = await Promise.all([
        projectsPromise,
        accountsPromise
      ]);

      if (projectsData.error || accountsData.error) {
        throw new Error("Failed to dashboard data");
      }

      setProjects(projectsData?.projects ?? []);
      setAccounts(accountsData.accounts);
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
      accounts,
      createProject: create,
      loading: loading && !projects.length
    }),
    [projects, loading, create, accounts]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
