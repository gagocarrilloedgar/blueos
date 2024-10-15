import { useEffect } from "react";

import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@/components/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";

import { defaultLocale, dynamicActivate } from "./config";
import { router } from "./router";

export const Providers = () => {
  useEffect(() => {
    // With this method we dynamically load the catalogs
    dynamicActivate(defaultLocale);
  }, []);

  return (
    <I18nProvider i18n={i18n}>
      <TooltipProvider>
        <ThemeProvider defaultTheme="light" storageKey="blue-ui-theme">
          <RouterProvider router={router} />
        </ThemeProvider>
      </TooltipProvider>
    </I18nProvider>
  );
};
