import { Button } from "@/components/ui/button";
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
  id: number;
  name: string;
  createdAt: string;
}

export interface TeamAccount {
  id: number;
  name: string;
  createdAt: string;
}

export const DashboardProjectsProvider = ({ children }: PropsWithChildren) => {
  const [projects, setProjects] = useState<DashboardProject[]>([]);
  const [accounts, setAccounts] = useState<TeamAccount[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { activeOrg } = useLayoutContext();

  const loadProjects = useCallback(async () => {
    if (!activeOrg) return;

    setLoading(true);

    try {
      const accountsPromise = fetch(
        `http://localhost:3000/api/v1/organizations/accounts/${activeOrg.id}`,
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

      const resp = await fetch("http://localhost:3000/api/v1/projects", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, organisationId: activeOrg.id })
      });

      if (!resp.ok) {
        toast.error("Ups, there's been an error", {
          description:
            "There's been an error creating the project. Please try again later"
        });
        return;
      }

      toast.success("Project created successfully");

      loadProjects();
    },
    [activeOrg, loadProjects]
  );

  const confirmDelete = useCallback(async (projectId: number) => {
    const resp = fetch(`http://localhost:3000/api/v1/projects/${projectId}`, {
      method: "DELETE",
      credentials: "include"
    });

    toast.promise(resp, {
      loading: "Deleting project...",
      success: () => {
        loadProjects();
        return "Project deleted successfully";
      },
      error: "Failed to delete project"
    });
  }, []);

  const deleteProject = useCallback(
    async (projectId: number) => {
      toast("Delete project", {
        closeButton: true,
        description: "This action will delete the project and all its data.",
        action: (
          <Button
            type="button"
            size="sm"
            onClick={() => confirmDelete(projectId)}
          >
            Delete
          </Button>
        )
      });
    },
    [loadProjects]
  );

  const value = useMemo(
    () => ({
      projects,
      accounts,
      createProject: create,
      deleteProject,
      loading: loading && !projects.length
    }),
    [projects, loading, create, accounts, deleteProject]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
