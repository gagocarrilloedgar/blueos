import { getTeams } from "@/modules/teams/application/getTeams";
import { Team, TeamsRepository } from "@/modules/teams/domain/TeamsRepository";
import {
    createContext,
    PropsWithChildren,
    useCallback,
    useEffect,
    useState
} from "react";
import { useAuth } from "../auth/AuthProvider";

interface ContextState {
  teams: Team[];
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
}: PropsWithChildren<{ teamsRepo: TeamsRepository }>) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [activeTeam, setActiveTeam] = useState<Team | null>(null);
  const [chats] = useState<
    {
      id: number;
      name: string;
      url: string;
    }[]
  >(new Array(1).fill({ id: 1, name: "general", url: "/general" }));
  const { account } = useAuth();

  const fetchTeams = useCallback(async () => {
    if (!account) return;
    const teams = await getTeams(teamsRepo)(account.id);

    setTeams(teams);
    setActiveTeam(teams[0]);
  }, [account, teamsRepo]);

  const setTeam = (team: Team) => {
    setActiveTeam(team);
  };

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);
  return (
    <LayoutContext.Provider value={{ teams, activeTeam, chats, setTeam }}>
      {children}
    </LayoutContext.Provider>
  );
};
