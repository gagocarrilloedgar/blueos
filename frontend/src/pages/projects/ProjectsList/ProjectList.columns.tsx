import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { getInitials } from "@/lib/getInitials";
import { getRandomPastelColor } from "@/lib/getRandomPastelColor";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpRight, Trash } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { ProjectDetail } from "../types";

export const useColumns = (): ColumnDef<ProjectDetail>[] => {
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
          <span className="flex w-min">
            <Button size="icon" asChild variant="ghost">
              <Link to={`/projects/${project.id}`}>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button size="icon" variant="ghost">
              <Trash className="w-4 h-4" />
            </Button>
          </span>
        );
      }
    }
  ];
};
