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

export interface DashboardProject {
  id: string;
  name: string;
  createdAt: string;
}

interface TeamAccount {
  id: string;
}

export const DashboardProjectsProvider = ({ children }: PropsWithChildren) => {
  const [projects, setProjects] = useState<DashboardProject[]>([]);
  const [accounts, setAccounts] = useState<TeamAccount[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { activeOrg } = useLayoutContext();

  const loadProjects = useCallback(async () => {
    if (!activeOrg) return;

    setLoading(true);

    try {
      const accountsPromise = fetch(
        "http://localhost:3000/api/v1/organizations/accounts",
        {
          credentials: "include"
        }
      );

      const projectsPromise = fetch("http://localhost:3000/api/v1/projects", {
        credentials: "include"
      });

      const [projectsData, accountsData] = await Promise.all([
        projectsPromise,
        accountsPromise
      ]);

      const [projectsJson, accountsJson] = await Promise.all([
        projectsData.json(),
        accountsData.json()
      ]);

      if (projectsJson.errors || accountsJson.errors) {
        throw new Error("Failed to dashboard data");
      }

      setProjects(projectsJson ?? []);
      setAccounts(accountsJson);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  }, [activeOrg]);

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

      const resp = await Promise.resolve({
        error: null
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
    [activeOrg, loadProjects]
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
