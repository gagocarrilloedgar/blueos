import { zodResolver } from "@hookform/resolvers/zod";

import { env } from "@/config/env";
import { useLayoutContext } from "@/pages/dashboard/useLayoutContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

import { ProjecSchema } from "./types";

export const useCreateProject = () => {
  const { activeOrg } = useLayoutContext();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { isPending, mutate: updateProject } = useMutation({
    mutationFn: async (data: z.infer<typeof ProjecSchema>) => {
      if (!activeOrg) return;

      const fetchPromise = fetch(`${env.apiUrl}/projects`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...data,
          organisationId: activeOrg.id
        })
      });

      return toast.promise(fetchPromise, {
        loading: "Created project...",
        success: "Project created successfully",
        error: "Failed to create project"
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    }
  });

  const onSubmit = (data: z.infer<typeof ProjecSchema>) => {
    updateProject(data);
  };

  const form = useForm<z.infer<typeof ProjecSchema>>({
    resolver: zodResolver(ProjecSchema),
    mode: "onSubmit"
  });

  const isDirty = form.formState.isDirty;

  return {
    isDirty,
    form,
    isPending,
    goBack: () => navigate("/projects"),
    onSubmit: form.handleSubmit(onSubmit)
  };
};
