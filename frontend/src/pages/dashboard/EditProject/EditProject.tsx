import { useNavigate } from "react-router-dom";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import { EditProjectForm } from "@/pages/projects/EditProject";

export const EditProjectSheet = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <Sheet open={true} onOpenChange={goBack}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit project</SheetTitle>
          <SheetDescription>
            Change the main details of your project here.
          </SheetDescription>
        </SheetHeader>
        <EditProjectForm />
      </SheetContent>
    </Sheet>
  );
};
