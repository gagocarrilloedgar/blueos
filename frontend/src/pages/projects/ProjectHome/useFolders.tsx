import { env } from "@/config";
import { Folders } from "@/pages/projects/types";
import { useQuery } from "@tanstack/react-query";

interface FolderResponse {
  data: Folders[];
  rowCount: number;
  pageCount: number;
}

export const useFolders = (projectId?: number) => {
  const { data, isLoading } = useQuery<FolderResponse>({
    queryKey: ["folders", "project", projectId],
    queryFn: () =>
      fetch(`${env.apiUrl}/folders/project/${projectId}`, {
        credentials: "include"
      })
        .then((res) => res.json())
        .catch((err) => {
          console.error(err);
          return null;
        }),
    enabled: !!projectId
  });

  return { data, isLoading };
};
