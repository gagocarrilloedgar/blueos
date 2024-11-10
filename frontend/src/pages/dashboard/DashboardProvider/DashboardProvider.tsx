import { Button } from "@/components/ui/button";
import { getInitials } from "@/lib/getInitials";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PropsWithChildren, useCallback, useMemo, useState } from "react";
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
  avatar: string;
  createdAt: string;
  verified: boolean;
}

export const DashboardProvider = ({ children }: PropsWithChildren) => {
  const [loading, setLoading] = useState<boolean>(true);

  const { activeOrg } = useLayoutContext();

  const queryClient = useQueryClient();
  const { data: projects, isLoading } = useQuery<DashboardProject[]>({
    queryKey: ["projects", "dashboard"],
    queryFn: async () => {
      setLoading(true);
      return fetch(`http://localhost:3000/api/v1/projects`, {
        credentials: "include"
      }).then(async (res) => {
        const json = await res.json();
        return json?.data;
      });
    }
  });
  const { data: accounts } = useQuery<TeamAccount[]>({
    queryKey: ["accounts", "dashboard"],
    queryFn: async () => {
      return fetch(
        `http://localhost:3000/api/v1/organizations/accounts/${activeOrg?.id}`,
        {
          credentials: "include"
        }
      ).then(async (res) => {
        const json = await res.json();
        return json?.data?.map((account: TeamAccount) => ({
          ...account,
          avatar: getInitials(account.name),
          createdAt: new Date(account.createdAt).toLocaleDateString()
        }));
      });
    },
    enabled: !!activeOrg
  });

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

      await queryClient.invalidateQueries({
        queryKey: ["projects", "dashboard"]
      });
    },
    [activeOrg]
  );

  const confirmDelete = useCallback(async (projectId: number) => {
    const resp = fetch(`http://localhost:3000/api/v1/projects/${projectId}`, {
      method: "DELETE",
      credentials: "include"
    });

    toast.promise(resp, {
      loading: "Deleting project...",
      success: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["projects", "dashboard"]
        });
        return "Project deleted successfully";
      },
      error: "Failed to delete project"
    });
  }, []);

  const deleteProject = useCallback(async (projectId: number) => {
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
  }, []);

  const value = useMemo(
    () => ({
      projects: projects ?? [],
      accounts: accounts ?? [],
      createProject: create,
      deleteProject,
      loading: isLoading
    }),
    [projects, loading, create, accounts, deleteProject]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
