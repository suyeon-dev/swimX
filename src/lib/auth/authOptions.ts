import CredentialsProvider from 'next-auth/providers/credentials';
import type { Session } from 'next-auth'; // 타입 import
import type { JWT } from 'next-auth/jwt';
import type { NextAuthOptions } from 'next-auth';
import { serverSupabase } from '../supabase/server';
import { SupabaseAdapter } from '@auth/supabase-adapter';
import bcrypt from 'bcryptjs';

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
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        // 1. 이메일로 사용자 조회
        const { data: user } = await serverSupabase
          .from('users')
          .select('*')
          .eq('email', email)
          .single();

        if (!user || !user.password) {
          console.log('사용자 없음!');
          return null;
        }

        console.log('사용자 찾음: ', user);

        // 2. 비밀번호 비교
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          console.log('비밀번호 불일치');
          return null;
        }

        // 3. 인증 성공 : 사용자 정보 반환
        console.log('로그인 성공');
        return {
          id: user.id,
          email: user.email,
          name: user.nickname ?? user.name,
          image: user.image,
        };
      },
    }),
  ],
  // SupabaseAdapter 설정 url, secret
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_PROJECT_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  secret: process.env.NEXTAUTH_SECRET, //필수

  // (!) 세션을 DB에 저장하도록 설정
  session: {
    strategy: 'jwt', // credentials 사용 시 필수
  },

  // 인증 성공 후 세션에 포함될 정보
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session?.user) {
        // token.sub는 string | undefined 이기 때문에 옵셔널 처리 필요
        session.user.id = token.sub ?? '';
      }
      return session;
    },
    // (!) 에러 해결
    async jwt({ token, user }) {
      //로그인 시 사용자 정보 토큰에 추가
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },

  // 전역 기본 설정 : signIn, signOut에 callbakcUrl이 없는 경우 fallback으로 사용됨
  pages: {
    signIn: '/signIn', //로그인 페이지
    signOut: '/signIn',
  },
};
