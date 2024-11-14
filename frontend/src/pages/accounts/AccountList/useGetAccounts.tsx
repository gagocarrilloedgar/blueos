import { useState } from "react";

import { env } from "@/config/env";
import { useDebounce } from "@/lib/useDebounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { PaginationState } from "@tanstack/react-table";
import { useLayoutContext } from "../../dashboard/useLayoutContext";
import { Account } from "./Account";

export const useGetAccounts = () => {
  const { activeOrg } = useLayoutContext();
  const [search, setSearch] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 15
  });

  const debouncedSearch = useDebounce(search ?? "");
  const searchQuery = search ? `&search=${debouncedSearch}` : "";

  const query = useQuery<{
    data: Account[];
    rowCount: number;
    pageCount: number;
  }>({
    queryKey: ["accounts", pagination, debouncedSearch],
    placeholderData: keepPreviousData,
    enabled: !!activeOrg,
    queryFn: async () => {
      return fetch(
        `${env.apiUrl}/accounts/organizations/${activeOrg?.id}?page=${pagination.pageIndex}&limit=${pagination.pageSize}${searchQuery}`,
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
