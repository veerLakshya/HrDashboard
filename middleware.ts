import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./app/auth";

const protectedRoutes = [
  "/user-info",
  "/dashboard",
  "/Employee",
  "/employee",
  "/analytics",
  "/bookmarks",
  "/settings",
];

export default async function middleware(request: NextRequest) {
  console.log("Middleware executed for path:", request.nextUrl.pathname);
  const session = await auth();

  const { pathname } = request.nextUrl;

  //case matching
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.toLowerCase().startsWith(route.toLowerCase())
  );

  // redirect
  if (session?.user && pathname === "/sign-in") {
    console.log("redirct signin tto home");
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isProtectedRoute && !session) {
    // console.log(
    //   `Redirecting unauthenticated user from protected route: ${pathname}`
    // );
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  console.log("session: ", session);
  return NextResponse.next();
}

// Configure which paths trigger this middleware
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|flam-logo.svg|site-icon.ico).*)",
  ],
};
