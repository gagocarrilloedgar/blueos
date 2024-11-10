import { useState } from "react";

import { useDebounce } from "@/lib/useDebounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { PaginationState } from "@tanstack/react-table";
import { useLayoutContext } from "../../dashboard/useLayoutContext";

export const useGetAccounts = () => {
  const { activeOrg } = useLayoutContext();
  const [search, setSearch] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 15
  });

  const debouncedSearch = useDebounce(search ?? "");
  const searchQuery = search ? `&search=${debouncedSearch}` : "";

  const query = useQuery({
    queryKey: ["accounts", pagination, debouncedSearch],
    placeholderData: keepPreviousData,
    enabled: !!activeOrg,
    queryFn: async () => {
      return fetch(
        `http://localhost:3000/api/v1/accounts/organizations/${activeOrg?.id}?page=${pagination.pageIndex}&limit=${pagination.pageSize}${searchQuery}`,
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
