import { useEffect } from "react";

import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@/components/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";

import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { defaultLocale, dynamicActivate } from "./config";
import { ErrorBoundary } from "./ErrorBoundary";
import { router } from "./router";

const queryClient = new QueryClient();

export const Providers = () => {
  useEffect(() => {
    dynamicActivate(defaultLocale);
  }, []);

  return (
    <ErrorBoundary>
      <I18nProvider i18n={i18n}>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <ThemeProvider defaultTheme="light" storageKey="blue-ui-theme">
              <RouterProvider router={router} />
              <Toaster richColors theme="light" />
            </ThemeProvider>
          </TooltipProvider>
        </QueryClientProvider>
      </I18nProvider>
    </ErrorBoundary>
  );
};
