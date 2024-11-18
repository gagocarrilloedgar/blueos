import { useNavigate } from "react-router-dom";

import { SlidePanel } from "@/components/ui/side-panel";
import { useSidebar } from "@/components/ui/sidebar";
import { EditProjectForm } from "./EditProjectForm";

export const EditProject = () => {
  const navigate = useNavigate();
  const goBack = () => navigate("/projects");
  const { open: isSidebarOpen } = useSidebar();
  return (
    <SlidePanel
      open={true}
      onClose={goBack}
      state={isSidebarOpen ? "open" : "closed"}
    >
      <EditProjectForm />
    </SlidePanel>
  );
};
