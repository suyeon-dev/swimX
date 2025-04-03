// Next-auth 기본 설정 파일

import NextAuth from 'next-auth'; //기본 방식으로 가져오기 (함수 import)
import CredentialsProvider from 'next-auth/providers/credentials';
import type { Session } from 'next-auth'; // 타입 import
import type { JWT } from 'next-auth/jwt';
import type { NextAuthOptions } from 'next-auth';

// Next-auth 설정 객체
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: '이메일', type: 'text' },
        password: { label: '비밀번호', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials ?? {};

        // 데모 계정 인증 조건 설정 (supabase 없이 직접 비교)
        if (email === 'demo@swimx.com' && password === 'demo1234') {
          return {
            id: 'demo-user',
            name: '데모 계정',
            email: 'demo@swimx.com',
          };
        }

        return null; //인증 실패
      },
    }),
  ],
  // 인증 성공 후 세션에 포함될 정보
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session?.user) {
        // token.sub는 string | undefined 이기 때문에 옵셔널 처리 필요
        session.user.id = token.sub ?? '';
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth', //로그인 페이지
  },

  secret: process.env.NEXTAUTH_SECRET, //필수
};

// Next.js App Router용 API Route 핸들러 등록
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
