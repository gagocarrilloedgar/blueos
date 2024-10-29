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

  const { activeOrg } = useLayoutContext();

  const loadProjects = useCallback(async () => {
    if (!activeOrg) return;

    setLoading(true);

    try {
      const accountsPromise = getTeamDashboardAccounts(projectsRepo)({
        organisationId: activeOrg.id
      });
      const projectsPromise = getProjects(projectsRepo)({
        organisationId: activeOrg.id
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
  }, [activeOrg, projectsRepo]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const create = useCallback(
    async (name?: string) => {
      if (!activeOrg) return;
      if (!name) {
        toast.error("Ups, there's been an error", {
          description: "Project name can not be empty"
        });
        return;
      }

      const resp = await createProject(projectsRepo)({
        name,
        organisationId: activeOrg.id
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
    [activeOrg, projectsRepo, loadProjects]
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
