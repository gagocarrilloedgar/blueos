import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { useAuth } from "@/pages/auth/AuthProvider";
import { Trans } from "@lingui/macro";
import { useLocation, useMatches, useNavigate } from "react-router-dom";

export const Breadcrumbs = () => {
  const { pathname } = useLocation();
  const matches = useMatches();
  const { account } = useAuth();
  const navigate = useNavigate();

  const isMorning = new Date().getHours() <= 12;
  const title = isMorning ? "Morning" : "Hello" + " " + account?.name;

  const breadcrumbs = matches
    .filter((match: any) => match.handle?.crumb)
    .map((match: any) => {
      const breadcrumb = match.handle.crumb(match.data, match.params);
      return {
        label: breadcrumb?.label || "",
        href: breadcrumb?.href || match.pathname
      };
    });

  if (pathname === "/" && account)
    return (
      <div className="flex items-center gap-2">
        <div className="flex text-sm aspect-square size-9 items-center justify-center rounded-full bg-indigo-100 text-sidebar-primary">
          {account.initials}
        </div>
        <span className="flex flex-col">
          <p className="leading-5 font-bold text-lg text-primary">{title}</p>
          <p className="text-sm text-muted-foreground">
            <Trans>Here's an onverview of your projects</Trans>
          </p>
        </span>
      </div>
    );

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => (
          <div
            key={breadcrumb.href}
            className="inline-flex items-center gap-1.5"
          >
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink
                onClick={() => {
                  navigate(breadcrumb.href);
                }}
                className="capitalize"
              >
                {breadcrumb.label}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index !== breadcrumbs.length - 1 && (
              <BreadcrumbSeparator className="hidden md:block" />
            )}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
