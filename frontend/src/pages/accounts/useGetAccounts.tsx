import { useQuery } from "@tanstack/react-query";

export const useGetAccounts = () => {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: () => {}
  });
};
