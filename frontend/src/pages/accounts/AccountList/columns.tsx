import { ColumnDef } from "@tanstack/react-table";

export type Account = {
  id: number;
  name: string;
  email: string;
  userId: string | null;
  createdAt: string;
};

export const useColumns = (): ColumnDef<Account>[] => {
  return [
    {
      accessorKey: "name",
      header: "Name"
    },
    {
      accessorKey: "email",
      header: "Email"
    },
    {
      accessorKey: "userId",
      header: "Confirmed",
      cell: ({ row }) => {
        const isVerified = Boolean(row.original.userId);
        if (isVerified)
          return (
            <span className="text-xs rounded-md px-2 py-1 bg-amber-200 text-gray-600 border border-amber-300">
              Confirmed
            </span>
          );

        return (
          <span className="text-xs rounded-md px-2 py-1 bg-gray-200 text-gray-600 border border-gray-300">
            Unconfirmed
          </span>
        );
      }
    },
    {
      accessorKey: "createdAt",
      header: "Created at",
      cell: ({ row }) => new Date(row.original.createdAt).toDateString()
    }
  ];
};
