import { QueryClient } from "@tanstack/react-query";
import { Params } from "react-router-dom";

import { env } from "@/config";
import { Project } from "./ProjectsList/columns";

export const projectBreadcrumbLoader =
  (params: Params) => async (queryClient: QueryClient) => {
    const projectNameQuery = {
      queryKey: ["projects", params.projectId],
      queryFn: () =>
        fetch(`${env.apiUrl}/projects/${params.projectId}`, {
          credentials: "include"
        }).then((res) => res.json())
    };

    const data: Project | undefined | null =
      (await queryClient.getQueryData(projectNameQuery.queryKey)) ??
      (await queryClient.fetchQuery(projectNameQuery));

    return { name: data?.name };
  };
