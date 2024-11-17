import { env } from "@/config";
import { Folders } from "@/pages/projects/types";
import { useQuery } from "@tanstack/react-query";

interface FolderResponse {
  data: Folders[];
  rowCount: number;
  pageCount: number;
}

export const useNestedFolders = (projectId?: number, parentId?: number) => {
  const queryString = parentId ? `?parentId=${parentId}` : "";
  const { data, isLoading } = useQuery<FolderResponse>({
    queryKey: ["folders", "project", projectId, parentId],
    queryFn: () =>
      fetch(`${env.apiUrl}/folders/project/${projectId}${queryString}`, {
        credentials: "include"
      })
        .then((res) => res.json())
        .catch((err) => {
          console.error(err);
          return null;
        }),
    enabled: !!projectId && !!parentId
  });

  return { data, isLoading };
};
