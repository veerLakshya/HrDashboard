import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./app/auth";

const protectedRoutes = ["/user-info", "/dashboard"];

export default async function middleware(request: NextRequest) {
  console.log("Middleware executed for path:", request.nextUrl.pathname);
  const session = await auth();

  const { pathname } = request.nextUrl;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  console.log("session: ", session);
  return NextResponse.next();
}
