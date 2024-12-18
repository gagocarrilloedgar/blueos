import { DataTable } from "@/components/ui/data-table";
import { DataTableViewOptions } from "@/components/ui/data-table-view-options";
import { Input } from "@/components/ui/input";
import { getCoreRowModel, Row, useReactTable } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { Account } from "./Account";
import { useColumns } from "./columns";
import { useGetAccounts } from "./useGetAccounts";

export const AccountsList = () => {
  const columns = useColumns();
  const navigate = useNavigate();
  const { query, search, setSearch, pagination, setPagination } =
    useGetAccounts();

  const table = useReactTable({
    data: query.data?.data ?? [],
    columns,
    meta: {
      loading: query.isLoading
    },
    rowCount: query.data?.rowCount,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true
  });

  const handleRowClick = (row: Row<Account>) => {
    navigate(`/accounts/${row.original.id}/details`);
  };

  return (
    <div className="mx-auto">
      <div className="flex flex-col gap-4">
        <div className="flex">
          <Input
            value={search ?? ""}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
            placeholder="Search by account name"
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
