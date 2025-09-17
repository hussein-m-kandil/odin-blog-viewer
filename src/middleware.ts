import {
  getBaseAuthData,
  getAuthorization,
  createAuthCookie,
  getResWithXHeaders,
} from './lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Verify the auth token, if exist
  if (await getAuthorization()) {
    const { user } = await getBaseAuthData();
    // Clear the auth cookie, if it is invalid
    if (!user) res.headers.set('Set-Cookie', createAuthCookie('', 0));
  }

  return getResWithXHeaders(req, res);
}

// Routes Middleware should not run on
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|[^/]*\\.(?:ico|svg|png|jpg|jpeg)$).*)',
  ],
};
