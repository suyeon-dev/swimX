// 페이지 접근 제어

import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

// 보호할 경로 설정
const protectedRoutes = ['/dashboard', '/diary', '/map', '/community'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 보호 경로가 아니면 그대로 통과
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  if (!isProtected) return NextResponse.next();

  const isDev = process.env.NODE_ENV !== 'production';

  // 로그인 여부 확인
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: !isDev && req.nextUrl.protocol === 'https:', // https일 때만 secure 쿠키 사용
  });

  // 비로그인 사용자 로그인 페이지로 리디렉션 + 안내 문구
  if (!token) {
    const loginUrl = new URL('/signIn', req.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    loginUrl.searchParams.set('message', '로그인이 필요한 서비스입니다.');
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next(); //통과
}

// 미들웨어 적용 경로 설정
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/diary/archive/:path*',
    '/map/:path*',
    '/community/:path*',
  ],
};
