import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";

export const DotBackground = () => {
  return (
    <DotPattern
      width={20}
      height={20}
      cx={1}
      cy={1}
      cr={1}
      className={cn("[mask-image:radial-gradient(black,transparent)]")}
    />
  );
};
