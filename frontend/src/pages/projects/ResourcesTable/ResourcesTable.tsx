import { getCoreRowModel, Row, useReactTable } from "@tanstack/react-table";

import { DataTable } from "@/components/ui/data-table";
import { DataTableViewOptions } from "@/components/ui/data-table-view-options";
import { Input } from "@/components/ui/input";

import { useColumns } from "./columns";
import { Task } from "./types";
import { useGetTasks } from "./useGetTasks";

export interface ResourcesTableProps {
  projectId?: string;
  folderId?: string;
}

export const ResourcesTable = ({
  projectId,
  folderId
}: ResourcesTableProps) => {
  const columns = useColumns();
  const { query, setPagination, pagination, search, setSearch } = useGetTasks(
    projectId,
    folderId
  );

  const table = useReactTable({
    data: query.data?.data ?? [],
    columns,
    meta: {
      loading: query.isLoading
    },
    rowCount: query.data?.rowCount,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(), // This is used to enable pagination, sorting, and filtering
    manualPagination: true
  });

  const handleRowClick = (row: Row<Task>) => {
    console.log({ row });
  };

  return (
    <div className="mx-auto w-full">
      <div className="flex flex-col gap-4">
        <div className="flex">
          <Input
            value={search ?? ""}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
            placeholder="Search by task name"
          />
          <DataTableViewOptions table={table} />
        </div>
        <DataTable
          columns={columns}
          table={table}
          onRowClick={handleRowClick}
        />
      </div>
    </div>
  );
};
