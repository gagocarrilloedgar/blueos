import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { AccountsWidget } from "./AccountsWidget";
import { ClientRequests } from "./ClientRequestsWidget";
import { ProjectsWidget } from "./ProjectsWidget";

export const Widgets = () => {
  const { getToken } = useAuth();

  useEffect(() => {
    const getUser = async () => {
      fetch("http://localhost:3000", {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      });
    };

    getUser();
  }, []);

  return (
    <div className="pt-2">
      <div className="grid gap-4 xl:grid-cols-2">
        <div className="flex flex-col gap-4">
          <ProjectsWidget />
          <AccountsWidget />
        </div>
        <ClientRequests />
      </div>
    </div>
  );
};
