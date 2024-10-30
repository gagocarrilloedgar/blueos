import { getSidebarOrganisations } from "@/modules/sidebar/application/getSidebarOrganisations";
import { getSidebarProjects } from "@/modules/sidebar/application/getSidebarProjects";
import {
  Organisation,
  SidebarProject,
  SidebarRepository
} from "@/modules/sidebar/domain/SidebarRepository";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";
import { useAuth } from "../auth/AuthProvider";

interface ContextState {
  organisations: Organisation[];
  projects: SidebarProject[];
  chats: {
    id: number;
    name: string;
    url: string;
  }[];
  activeOrg: Organisation | null;
  setOrganisation: (team: Organisation) => void;
}

export const LayoutContext = createContext({} as ContextState);

export const LayoutProvider = ({
  teamsRepo,
  children
}: PropsWithChildren<{ teamsRepo: SidebarRepository }>) => {
  const [organisations, setOrganisations] = useState<Organisation[]>([]);
  const [activeOrg, setActiveOrg] = useState<Organisation | null>(null);
  const [projects, setProjects] = useState<SidebarProject[]>([]);
  const { account } = useAuth();

  const [chats] = useState<
    {
      id: number;
      name: string;
      url: string;
    }[]
  >(new Array(1).fill({ id: 1, name: "general", url: "/general" }));

  const fetchProjects = useCallback(
    async (organisationId: number) => {
      const loadedProjects = await getSidebarProjects(teamsRepo)({
        organisationId
      });
      if (loadedProjects.projects) {
        setProjects(loadedProjects.projects);
      }
    },
    [teamsRepo]
  );

  const fetchInitialData = useCallback(async () => {
    if (!account) return;
    const fetchedTeams = await getSidebarOrganisations(teamsRepo)(account.id);

    console.log({ fetchedTeams });

    setOrganisations(fetchedTeams);
    const currentTeam = fetchedTeams[0];
    setActiveOrg(currentTeam);

    if (currentTeam) {
      fetchProjects(currentTeam.id);
    }
  }, [account, teamsRepo, fetchProjects]);

  const setOrganisation = useCallback(
    (org: Organisation) => {
      setActiveOrg(org);
      fetchProjects(org.id);
    },
    [fetchProjects]
  );

  useEffect(() => {
    fetchInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  const value = useMemo(
    () => ({
      organisations,
      setOrganisation,
      chats,
      activeOrg,
      projects
    }),
    [organisations, setOrganisation, chats, activeOrg, projects]
  );

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};
