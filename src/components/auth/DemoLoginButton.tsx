'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

export default function DemoLoginButton() {
  const router = useRouter(); //클라이언트 라우팅 기능 사용

  // 데모 계정으로 자동 로그인하는 함수
  const handleDemoLogin = async () => {
    const res = await signIn('credentials', {
      email: process.env.NEXT_PUBLIC_DEMO_EMAIL,
      password: process.env.NEXT_PUBLIC_DEMO_PASSWORD,
      redirect: false, //직접 라우팅 처리하기 위해 False 설정
    });

    if (res?.ok) {
      router.push('/');
    } else {
      alert('데모 로그인 실패');
      console.error('데모 로그인 실패:', res?.error);
    }
  };

  return (
    <Button
      type='button' //button이 Submit 역할하지 않도록
      onClick={handleDemoLogin}
      className='w-full h-12 text-md font-semibold bg-gray-100 text-black hover:bg-gray-200 mb-4'
    >
      데모 계정으로 체험하기
    </Button>
  );
}
