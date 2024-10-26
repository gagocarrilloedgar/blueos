import { getSidebarProjects } from "@/modules/sidebar/application/getSidebarProjects";
import { getTeams } from "@/modules/sidebar/application/getTeams";
import {
  SidebarProject,
  SidebarRepository,
  Team
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
  teams: Team[];
  projects: SidebarProject[];
  chats: {
    id: number;
    name: string;
    url: string;
  }[];
  activeTeam: Team | null;
  setTeam: (team: Team) => void;
}

export const LayoutContext = createContext({} as ContextState);

export const LayoutProvider = ({
  teamsRepo,
  children
}: PropsWithChildren<{ teamsRepo: SidebarRepository }>) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [activeTeam, setActiveTeam] = useState<Team | null>(null);
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
    async (teamId: number) => {
      const loadedProjects = await getSidebarProjects(teamsRepo)({ teamId });
      if (loadedProjects.projects) {
        setProjects(loadedProjects.projects);
      }
    },
    [teamsRepo]
  );

  const fetchInitialData = useCallback(async () => {
    if (!account) return;
    const fetchedTeams = await getTeams(teamsRepo)(account.id);

    setTeams(fetchedTeams);
    const currentTeam = fetchedTeams[0];
    setActiveTeam(currentTeam);

    if (currentTeam) {
      fetchProjects(currentTeam.id);
    }
  }, [account, teamsRepo, fetchProjects]);

  const setTeam = useCallback(
    (team: Team) => {
      setActiveTeam(team);
      fetchProjects(team.id);
    },
    [fetchProjects]
  );

  useEffect(() => {
    fetchInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  const value = useMemo(
    () => ({
      teams,
      activeTeam,
      chats,
      setTeam,
      projects
    }),
    [teams, activeTeam, chats, setTeam, projects]
  );

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};
