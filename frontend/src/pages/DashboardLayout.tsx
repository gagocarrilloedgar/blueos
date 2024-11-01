
import { Outlet } from "react-router-dom";
import { DashboardProjectsProvider } from "./dashboard/DashboardProjectsProvider/DashboardProjectsProvider";
import { Widgets } from "./dashboard/Widgets";

export default function DashboardLayout() {
  return (
    <DashboardProjectsProvider>
      <Widgets />
      <Outlet />
    </DashboardProjectsProvider>
  );
}
