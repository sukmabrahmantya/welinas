import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_COOKIE = "welinas_session";
const DASHBOARD_PATH = "/dashboard";
const PROTECTED_PATHS = ["/dashboard"];
const AUTH_ONLY_PATHS = ["/login", "/signup"];

export function middleware(request: NextRequest) {
  const session = request.cookies.get(AUTH_COOKIE)?.value;
  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED_PATHS.some((path) =>
    pathname.startsWith(path),
  );
  const isAuthPage = AUTH_ONLY_PATHS.includes(pathname);

  if (isProtected && !session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthPage && session) {
    const dashboardUrl = new URL(DASHBOARD_PATH, request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};
