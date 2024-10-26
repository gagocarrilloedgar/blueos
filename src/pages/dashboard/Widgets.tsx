import { ActionCard } from "./ActionCard";
import { ClientRequests } from "./ClientRequestsWidget";
import { ProjectsWidget } from "./ProjectsWidget";

export const Widgets = () => {
  return (
    <div className="pt-2">
      <div className="grid gap-4 xl:grid-cols-2">
        <div className="flex flex-col gap-4">
          <ProjectsWidget />
          <ActionCard
            title="Team members"
            placeholder="a@example.com"
            emptyState="There are no team members"
            description="Invite new team members to collaborate"
          />
        </div>
        <ClientRequests />
      </div>
    </div>
  );
};
