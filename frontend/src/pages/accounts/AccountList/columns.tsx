import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { useAuth } from "@/pages/auth/AuthProvider";
import { TrashIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { useRemoveAccount } from "../useRemoveAccount";
import { Account } from "./Account";

export const useColumns = (): ColumnDef<Account>[] => {
  const { account: currentAccount } = useAuth();
  const { deleteAccount } = useRemoveAccount();
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
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const canEdit = currentAccount?.isAdmin;
        const yourAccount = row.original.id === currentAccount?.id;
        return (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                disabled={!canEdit || yourAccount}
                onClick={() => deleteAccount(row.original.id)}
                size="icon"
                variant="ghost"
                className="h-8 w-8 p-0"
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Remove from organization</TooltipContent>
          </Tooltip>
        );
      }
    }
  ];
};
