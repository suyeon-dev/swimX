'use client';

import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

export default function HeaderAuthSection() {
  const { data: session } = useSession();
  const router = useRouter();

  return session?.user ? (
    <Button
      onClick={() => signOut({ callbackUrl: '/signIn' })}
      className='cursor-pointer'
    >
      로그아웃
    </Button>
  ) : (
    <Button onClick={() => router.push('/signIn')} className='cursor-pointer'>
      로그인
    </Button>
  );
}

// useRouter() AppRouter 전용 훅으로 클라이언트 측 라우팅 수행 -> 새로고침 없이 페이지 전환 가능
