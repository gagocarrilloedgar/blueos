import { useState } from "react";

import { env } from "@/config/env";
import { useDebounce } from "@/lib/useDebounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { PaginationState } from "@tanstack/react-table";
import { useLayoutContext } from "../../dashboard/useLayoutContext";
import { Task } from "./types";

export const useGetTasks = (projectId?: string, folderId?: string) => {
  const { activeOrg } = useLayoutContext();
  const [search, setSearch] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 15
  });

  const debouncedSearch = useDebounce(search ?? "");
  const searchQuery = search ? `&search=${debouncedSearch}` : "";

  const queryParams = {
    projectId,
    folderId
  };

  const queryString = Object.entries(queryParams)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  const queryKey = [
    "tasks",
    pagination,
    projectId,
    folderId,
    debouncedSearch
  ].filter(Boolean);

  const query = useQuery<{
    data: Task[];
    rowCount: number;
    pageCount: number;
  }>({
    queryKey,
    placeholderData: keepPreviousData,
    enabled: !!activeOrg,
    queryFn: async () => {
      return fetch(
        `${env.apiUrl}/tasks?page=${pagination.pageIndex}&limit=${pagination.pageSize}&${queryString}${searchQuery}`,
        {
          credentials: "include"
        }
      ).then(async (res) => {
        const data = await res.json();
        return {
          data: data.data,
          rowCount: data.rowCount,
          pageCount: data.pageCount
        };
      });
    }
  });

  return {
    query,
    search,
    setSearch,
    pagination,
    setPagination
  };
};
