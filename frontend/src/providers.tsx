import { useEffect } from "react";

import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@/components/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";

import { Toaster } from "@/components/ui/sonner";
import { defaultLocale, dynamicActivate } from "./config";
import { ErrorBoundary } from "./ErrorBoundary";
import { router } from "./router";

export const Providers = () => {
  useEffect(() => {
    dynamicActivate(defaultLocale);
  }, []);

  return (
    <ErrorBoundary>
      <I18nProvider i18n={i18n}>
        <TooltipProvider>
          <ThemeProvider defaultTheme="light" storageKey="blue-ui-theme">
            <RouterProvider router={router} />
            <Toaster richColors theme="light" />
          </ThemeProvider>
        </TooltipProvider>
      </I18nProvider>
    </ErrorBoundary>
  );
};
