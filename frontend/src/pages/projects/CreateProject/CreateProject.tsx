import { Button } from "@/components/ui/button";
import {
  SlidePanel,
  SlidePanelConent,
  SlidePanelFooter,
  SlidePanelHeader
} from "@/components/ui/side-panel";
import { useSidebar } from "@/components/ui/sidebar";
import { CreateProjectForm } from "./CreateProjectForm";
import { useClients } from "./useClients";
import { useCreateProject } from "./useCreateProject";

export const CreateProject = () => {
  const { open: isSidebarOpen } = useSidebar();

  const { goBack, isDirty, isPending, form, onSubmit } = useCreateProject();
  const { clients, setShowCreateClient, showNoClients, showCreateClient } =
    useClients();
  return (
    <SlidePanel
      open={true}
      onClose={goBack}
      state={isSidebarOpen ? "open" : "closed"}
    >
      <SlidePanelHeader>
        <h1 className="font-bold">New Project</h1>
      </SlidePanelHeader>
      <SlidePanelConent>
        <CreateProjectForm
          onSubmit={onSubmit}
          clients={clients}
          showCreateClient={showCreateClient}
          setShowCreateClient={setShowCreateClient}
          form={form}
          showNoClients={showNoClients}
        />
      </SlidePanelConent>
      <SlidePanelFooter>
        <Button
          size="sm"
          onClick={() =>
            showCreateClient ? setShowCreateClient(false) : goBack()
          }
          variant="outline"
        >
          Cancel
        </Button>

        <Button
          disabled={isPending || (!isDirty && !showCreateClient)}
          form={showCreateClient ? "create-client-form" : "edit-project-form"}
          size="sm"
          type="submit"
        >
          {showCreateClient ? "Create client" : "Save"}
        </Button>
      </SlidePanelFooter>
    </SlidePanel>
  );
};
