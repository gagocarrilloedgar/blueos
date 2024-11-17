import {
    ColumnDef,
    flexRender,
    Row,
    RowData,
    Table as TableType
} from "@tanstack/react-table";

import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  table: TableType<TData>;
  columns: ColumnDef<TData, TValue>[];
  onRowClick: (row: Row<TData>) => void;
}

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    loading?: boolean;
  }
}

export function DataTable<TData, TValue>({
  table,
  columns,
  onRowClick
}: DataTableProps<TData, TValue>) {
  const rows = table.getRowModel().rows;

  const isLoading = table.options.meta?.loading;
  const isEmpty = !rows.length;

  if (!rows?.length && isLoading) return <EmptySkeleton />;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row: Row<TData>) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => {
                const noCursor =
                  cell.id.includes("id") || cell.id.includes("actions");
                return (
                  <TableCell
                    className={noCursor ? "" : "cursor-pointer"}
                    onClick={() => {
                      if (!noCursor) onRowClick(row);
                    }}
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
        <EmptyState isEmpty={isEmpty} colSpan={columns.length} />
      </Table>
      <DataTablePagination table={table} />
    </div>
  );
}

const EmptyState = ({
  isEmpty,
  description = "There's no data ",
  colSpan
}: {
  isEmpty?: boolean;
  description?: string;
  colSpan: number;
}) => {
  if (!isEmpty) return null;

  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="h-24 text-center">
        {description}
      </TableCell>
    </TableRow>
  );
};

const EmptySkeleton = () => {
  const cols = new Array(10).fill(0);
  return (
    <span className="flex flex-col gap-2">
      {cols.map((val) => (
        <Skeleton key={val} className="w-full h-10" />
      ))}
    </span>
  );
};
