import { useQuery } from "@tanstack/react-query";

import { env } from "@/config/env";
import { useLayoutContext } from "@/pages/dashboard/useLayoutContext";

import { useState } from "react";
import { Client } from "./types";

export const useClients = () => {
  const { activeOrg } = useLayoutContext();
  const [showCreateClient, setShowCreateClient] = useState(false);

  const { data: clients, isLoading } = useQuery<Client[]>({
    queryKey: ["clients", activeOrg?.id],
    queryFn: () =>
      fetch(`${env.apiUrl}/clients/organisation/${activeOrg?.id}`, {
        credentials: "include"
      }).then((res) => res.json()),
    enabled: !!activeOrg?.id
  });

  const showNoClients = clients?.length === 0;

  return {
    showNoClients,
    showCreateClient,
    setShowCreateClient,
    clients,
    isLoading
  };
};
