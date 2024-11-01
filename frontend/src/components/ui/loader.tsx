import { cn } from "@/lib/utils";

export const Loader = ({ className }: { className?: string }) => {
  return (
    <span
      className={cn(
        "animate-ping absolute inline-flex h-10 w-10 rounded-full bg-sky-400 opacity-75",
        className
      )}
    ></span>
  );
};
