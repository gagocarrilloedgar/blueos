import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";
import { locales, routing } from "./i18n/routing";

const publicPages = ["/", "/login", "/signup"];

const handleI18nRouting = createMiddleware(routing);

// Create an instance of AuthMiddleware
export default async function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join("|")}))?(${publicPages
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i"
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) return handleI18nRouting(req);

  const session = await auth();
  if (!session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return handleI18nRouting(req);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
