import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";
import { useAuth } from "../auth/AuthProvider";
import { LayoutContext, Organisation, SidebarProject } from "./LayoutContext";

export const LayoutProvider = ({ children }: PropsWithChildren) => {
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

  const fetchProjects = useCallback(async (organisationId: number) => {
    const data = await fetch(
      `http://localhost:3000/api/v1/projects?organisationId=${organisationId}`,
      {
        credentials: "include"
      }
    );

    const loadedProjects = await data.json();

    if (loadedProjects) {
      setProjects(loadedProjects);
    }
  }, []);

  const fetchInitialData = useCallback(async () => {
    if (!account) return;
    const data = await fetch(
      `http://localhost:3000/api/v1/organizations/account/${account.id}`,
      {
        credentials: "include"
      }
    );

    const fetchedTeams = await data.json();

    setOrganisations(fetchedTeams);
    const currentTeam = fetchedTeams[0];
    setActiveOrg(currentTeam);

    if (currentTeam) {
      fetchProjects(currentTeam.id);
    }
  }, [account, fetchProjects]);

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
