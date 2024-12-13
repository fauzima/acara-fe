import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

const protectedPages = ["/user/profile"];
const protectedAfterAuth = ["/user/register", "/user/login","/promotor/register","/promotor/login"];
const protectedProm = ["/promotor/dashboard"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const url = request.nextUrl.pathname;

  if (protectedPages.some((route) => url.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL("/user/login", request.url));
  } else if (protectedPages.some((route) => url.startsWith(route)) && token) {
    const acc: { role: "promotor" | "user" } = jwtDecode(token?.value);
    if (acc.role !== "user") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (protectedProm.some((route) => url.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL("/promotor/login", request.url));
  } else if (protectedProm.some((route) => url.startsWith(route)) && token) {
    const acc: { role: "promotor" | "user" } = jwtDecode(token?.value);
    if (acc.role !== "promotor") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (protectedAfterAuth.some((route) => url.startsWith(route)) && token) {
    return NextResponse.redirect(new URL("/", request.url));
  } 
}
