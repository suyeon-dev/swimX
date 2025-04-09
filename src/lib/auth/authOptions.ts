import CredentialsProvider from 'next-auth/providers/credentials';
import type { Session } from 'next-auth'; // 타입 import
import type { JWT } from 'next-auth/jwt';
import type { NextAuthOptions } from 'next-auth';
import { serverSupabase } from '../api/supabase';
import { SupabaseAdapter } from '@auth/supabase-adapter';
import bcrypt from 'bcrypt';

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

        if (!user || !user.password) return null;

        // 2. 비밀번호 비교
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return null;

        // 3. 인증 성공 : 사용자 정보 반환
        return {
          id: user.id,
          email: user.email,
          name: user.nickname ?? user.name,
          image: user.image,
        };
      },
    }),
  ],
  // SupabaseAdapter 설정은 "URL + KEY" 로 전달해야 함
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),

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
  // 전역 기본 설정 : signIn, signOut에 callbakcUrl이 없는 경우 fallback으로 사용됨
  pages: {
    signIn: '/signIn', //로그인 페이지
    signOut: '/signIn',
  },

  secret: process.env.NEXTAUTH_SECRET, //필수
};
