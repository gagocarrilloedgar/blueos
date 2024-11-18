import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const ProjectListAction = () => {
  return (
    <Button size="sm" asChild>
      <Link to="/projects/new">Create project</Link>
    </Button>
  );
};
