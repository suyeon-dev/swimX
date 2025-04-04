// Next-auth 기본 설정 파일
import NextAuth from 'next-auth'; //기본 방식으로 가져오기 (함수 import)
import { authOptions } from '@/lib/auth/authOptions';

// Next.js App Router용 API Route 핸들러 등록
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
