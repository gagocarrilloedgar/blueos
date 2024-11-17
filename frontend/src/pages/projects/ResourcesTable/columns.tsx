import { ColumnDef } from "@tanstack/react-table";
import { Task } from "./types";

export const useColumns = (): ColumnDef<Task>[] => {
  return [
    {
      header: "Name",
      accessorKey: "name"
    },
    {
      header: "Description",
      accessorKey: "description"
    },
    {
      header: "Status",
      accessorKey: "status"
    },
    {
      header: "Priority",
      accessorKey: "priority"
    },
    {
      header: "Assignees",
      cell: ({ row }) => {
        return row.original.assignees
          .map((assignee) => assignee.name)
          .join(", ");
      }
    },
    {
      header: "Created At",
      accessorKey: "createdAt"
    }
  ];
};
