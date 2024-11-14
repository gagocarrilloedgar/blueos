import { DataTableViewOptions } from "@/components/ui/data-table-view-options";
import { Input } from "@/components/ui/input";
import { env } from "@/config/env";
import { useDebounce } from "@/lib/useDebounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  getCoreRowModel,
  PaginationState,
  Row,
  useReactTable
} from "@tanstack/react-table";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Project, useColumns } from "./columns";
import { DataTable } from "./DataTable";

export default function ProjectsList() {
  const columns = useColumns();
  const [search, setSearch] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 15
  });
  const navigate = useNavigate();

  const debouncedSearch = useDebounce(search ?? "");
  const searchQuery = search ? `&search=${debouncedSearch}` : "";

  const queryData = useQuery<{
    rows: Project[];
    rowCount: number;
    pageCount: number;
  }>({
    queryKey: ["projects", pagination, debouncedSearch],
    placeholderData: keepPreviousData,
    queryFn: () =>
      fetch(
        `${env.apiUrl}/projects/overview?page=${pagination.pageIndex}&limit=${pagination.pageSize}${searchQuery}`,
        {
          credentials: "include"
        }
      ).then(async (res) => {
        const data = await res.json();
        return {
          rows: data.data,
          rowCount: data.rowCount,
          pageCount: data.pageCount
        };
      })
  });

  const table = useReactTable({
    data: queryData.data?.rows ?? [],
    columns,
    rowCount: queryData?.data?.rowCount,
    state: {
      pagination
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true // "server-side" pagination,
  });

  const navigateToProject = (row: Row<Project>) => {
    navigate(`/projects/${row.original?.id}/details`);
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-4">
        <div className="flex">
          <Input
            value={search ?? ""}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
            placeholder="Search by project name"
          />
          <DataTableViewOptions table={table} />
        </div>

        <DataTable
          columns={columns}
          table={table}
          onRowClick={navigateToProject}
        />
      </div>
    </div>
  );
}
