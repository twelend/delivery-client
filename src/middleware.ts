import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const { url } = request;

  const token = request.cookies.get('auth-token')?.value;
  
  const isAuthPage = url.includes("/auth");

  if (isAuthPage) {
    if (token) {
      return NextResponse.redirect(new URL("/profile", url));
    }
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", url));
  }
}

export const config = {
  matcher: ["/profile", "/auth/:path*"],
};
