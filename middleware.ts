import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getIronSession } from "iron-session/edge";
import { sessionOptions } from './lib/session';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const session = await getIronSession(request, response, sessionOptions);
  const reqLoginPage = request.url.includes('/login');
  if (reqLoginPage && Object.keys(session).length != 0) {
    console.log('session found')
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (!reqLoginPage && Object.keys(session).length === 0) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return response;
}

export const config = {
  matcher: [
    '/((?!api|static|favicon.ico|_next).*)',
  ]
}