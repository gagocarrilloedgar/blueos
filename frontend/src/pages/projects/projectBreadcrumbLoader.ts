import { QueryClient } from "@tanstack/react-query";
import { Params } from "react-router-dom";

import { env } from "@/config";
import { getInitials } from "@/lib/getInitials";
import { ProjectDetail } from "./types";

export const projectBreadcrumbLoader =
  (params: Params) => async (queryClient: QueryClient) => {
    const projectNameQuery = {
      queryKey: ["projects", params.projectId],
      queryFn: () =>
        fetch(`${env.apiUrl}/projects/${params.projectId}`, {
          credentials: "include"
        }).then((res) => res.json())
    };

    const data: ProjectDetail | undefined | null =
      (await queryClient.getQueryData(projectNameQuery.queryKey)) ??
      (await queryClient.fetchQuery(projectNameQuery));

    return { ...data, avatar: getInitials(data?.name ?? "") };
  };
