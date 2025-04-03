'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

export default function DemoLoginButton() {
  const router = useRouter(); //클라이언트 라우팅 기능 사용

  // 데모 계정으로 자동 로그인하는 함수
  const handleDemoLogin = async () => {
    const res = await signIn('credentials', {
      redirect: false, //직접 라우팅 처리하기 위해 False 설정
      email: 'demo@swimx.com', //테스트 계정 이메일
      password: 'demo1234',
    });

    if (res?.ok) {
      router.push('/');
    } else {
      alert('데모 로그인 실패');
    }
  };

  return (
    <Button
      onClick={handleDemoLogin}
      className='w-full h-12 text-m font-semibold bg-gray-100 text-black hover:bg-gray-200 mb-4'
    >
      데모 계정으로 체험하기
    </Button>
  );
}
