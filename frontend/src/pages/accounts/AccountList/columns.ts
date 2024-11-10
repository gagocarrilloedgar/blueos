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
      accessorKey: "id",
      header: "ID"
    },
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
      header: "User ID"
    },
    {
      accessorKey: "createdAt",
      header: "Created At"
    }
  ];
};
