import { Skeleton } from "@/components/ui/skeleton";

export const FoldersSkeletons = () => {
  return Array.from({ length: 8 }).map((_, index) => (
    <Skeleton key={index} className="h-10 w-full" />
  ));
};
