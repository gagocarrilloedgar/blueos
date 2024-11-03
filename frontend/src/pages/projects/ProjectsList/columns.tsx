import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { getInitials } from "@/lib/getInitials";
import { getRandomPastelColor } from "@/lib/getRandomPastelColor";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Project = {
  id: number;
  name: string;
  description: string;
  workedHours: number;
  createdAt: string;
  client: {
    id: number;
    name: string;
  };
};

export const useColumns = (): ColumnDef<Project>[] => {
  const navigate = useNavigate();
  return [
    {
      id: "id",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          className="border-muted-foreground"
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      )
    },
    {
      accessorKey: "name",
      header: "Name"
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => {
        const description = row.original.description;
        if (!description) return <div>-</div>;

        return <span className="line-clamp-2">{description}</span>;
      }
    },
    {
      accessorKey: "workedHours",
      header: "Worked Hours",
      cell: ({ row }) => {
        const workedHours = row.original.workedHours;
        if (!workedHours) return <div className="text-center">-</div>;

        return <div className="text-center">{workedHours}h</div>;
      }
    },
    {
      accessorKey: "client.name",
      header: "Client",
      maxSize: 300,
      cell: ({ row }) => {
        const client = row.original.client;

        if (!client?.id)
          return (
            <span className="text-muted-foreground text-xs">
              Click to update
            </span>
          );

        return (
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className={`text-xs ${getRandomPastelColor()}`}>
                {getInitials(client.name)}
              </AvatarFallback>
            </Avatar>
            <span>{client?.name}</span>
          </div>
        );
      }
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const project = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsVerticalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigate(`/projects/${project.id}`)}
              >
                View project
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigate(`/projects/${project.id}/details`)}
              >
                View project details
              </DropdownMenuItem>
              <DropdownMenuItem>Delete project</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }
    }
  ];
};
