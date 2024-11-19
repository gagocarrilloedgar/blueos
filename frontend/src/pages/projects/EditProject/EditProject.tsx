import { useNavigate } from "react-router-dom";

import { SlidePanel } from "@/components/ui/side-panel";
import { useSidebar } from "@/components/ui/sidebar";
import { EditProjectForm } from "./EditProjectForm";

interface EditProjectProps {
  pureNavigateBack?: boolean;
}

export const EditProject = ({ pureNavigateBack }: EditProjectProps) => {
  const navigate = useNavigate();
  const goBack = () => navigate("/projects");
  const pureGoBack = () => navigate(-1);

  const { open: isSidebarOpen } = useSidebar();
  return (
    <SlidePanel
      open={true}
      onClose={pureNavigateBack ? pureGoBack : goBack}
      state={isSidebarOpen ? "open" : "closed"}
    >
      <EditProjectForm />
    </SlidePanel>
  );
};
