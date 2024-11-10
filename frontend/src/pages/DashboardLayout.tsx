
import { Outlet } from "react-router-dom";
import { DashboardProvider } from "./dashboard/DashboardProvider/DashboardProvider";
import { Widgets } from "./dashboard/Widgets";

export default function DashboardLayout() {
  return (
    <DashboardProvider>
      <Widgets />
      <Outlet />
    </DashboardProvider>
  );
}
