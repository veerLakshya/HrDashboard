import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./app/auth";

const protectedRoutes = [
  "/user-info",
  "/dashboard",
  "/Employee", // Fixed case sensitivity
  "/analytics",
  "/bookmarks", // Added missing protection
  "/settings", // Added missing protection
];

export default async function middleware(request: NextRequest) {
  console.log("Middleware executed for path:", request.nextUrl.pathname);
  const session = await auth();

  const { pathname } = request.nextUrl;

  // Case-insensitive route matching for better protection
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.toLowerCase().startsWith(route.toLowerCase())
  );

  // Redirect authenticated users away from sign-in page
  if (session?.user && pathname === "/sign-in") {
    console.log("Redirecting authenticated user from sign-in to home");
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Protect routes that require authentication
  if (isProtectedRoute && !session) {
    console.log(
      `Redirecting unauthenticated user from protected route: ${pathname}`
    );
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  console.log("session: ", session);
  return NextResponse.next();
}

// Configure which paths trigger this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - flam-logo.svg (logo file)
     * - site-icon.ico (site icon)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|flam-logo.svg|site-icon.ico).*)",
  ],
};
