import csrf from "edge-csrf";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const csrfProtect = csrf();

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  // csrf validation
  const csrfError = await csrfProtect(request, response);
  // if an error occurs, then token is not valid
  if (csrfError) {
    return new NextResponse("invalid csrf token", { status: 403 });
  }
  return response;
}
