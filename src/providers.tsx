import { lazy, useEffect } from "react";

import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@/components/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";

import { Toaster } from "@/components/ui/sonner";
import { defaultLocale, dynamicActivate } from "./config";
import { ErrorBoundary } from "./ErrorBoundary";
import { createSupabaseAuthRepository } from "./modules/auth/infra/SupabaseAuthRepository";
import { router } from "./router";

const AuthProviderLazy = lazy(
  () => import("./pages/auth/AuthProvider/AuthProvider")
);

const repo = createSupabaseAuthRepository();

export const Providers = () => {
  useEffect(() => {
    dynamicActivate(defaultLocale);
  }, []);

  return (
    <ErrorBoundary>
      <I18nProvider i18n={i18n}>
        <TooltipProvider>
          <ThemeProvider defaultTheme="light" storageKey="blue-ui-theme">
            <AuthProviderLazy authRepo={repo}>
              <RouterProvider router={router} />
            </AuthProviderLazy>
            <Toaster />
          </ThemeProvider>
        </TooltipProvider>
      </I18nProvider>
    </ErrorBoundary>
  );
};
