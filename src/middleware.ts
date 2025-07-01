import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const { url, headers } = request;

  const authHeader = headers.get("Authorization");

  const token = authHeader?.split(" ")[1];
  console.log(token);
  const isAuthPage = url.includes("/auth");

  if (isAuthPage) {
    if (token) {
      return NextResponse.redirect(new URL("/profile", url));
    }
    return NextResponse.next();
  }

  // if (!token) {
  //   return NextResponse.redirect(new URL("/auth/login", url));
  // }
}

export const config = {
  matcher: ["/profile", "/auth/:path*"],
};
