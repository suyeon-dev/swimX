'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import HeroImage from './HeroImage';
import { useSession } from 'next-auth/react';
import { ToastMessageHandler } from '../common/Toast';

export default function HeroSection() {
  const { data: session } = useSession(); // 현재 로그인 세션 정보 조회
  const isLoggedIn = !!session?.user;

  return (
    <>
      <ToastMessageHandler />
      <section className='relative w-full py-20 md:min-h-[70vh] flex flex-col justify-center items-center px-4 text-center bg-gradient-to-b from-white via-[#f4f8ff] to-[#eaf3ff]'>
        {/* 1. 문구 */}
        <div className='z-10'>
          <h1 className='text-3xl md:text-5xl font-bold mb-16 md:mb-6 leading-tight tracking-tight text-black'>
            <p className='mb-4'>수영 기록의 시작</p>
            <p>SwimX 에서 쉽고 간편하게</p>
          </h1>

          {/* 2. 버튼 */}
          <div className='flex gap-4 justify-center mt-10 md:mt-16 font-bold text-lg'>
            {isLoggedIn ? (
              <>
                <Link href='/diary/write'>
                  <Button className='bg-white text-blue-600 hover:bg-blue-50 px-6 py-6 md:px-8 md:py-6 rounded-lg font-semibold text-md md:text-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer'>
                    일기 쓰기
                  </Button>
                </Link>
                <Link href='/diary/archive'>
                  <Button className='bg-blue-600 text-white hover:bg-blue-700 px-6 py-6 md:px-8 md:py-6 rounded-lg font-semibold text-md md:text-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer'>
                    아카이브
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href='/signUp'>
                  <Button className='bg-white text-blue-600 hover:bg-blue-50 px-6 py-6 md:px-8 md:py-6 rounded-lg font-semibold text-md md:text-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer'>
                    회원가입
                  </Button>
                </Link>
                <Link href='/signIn'>
                  <Button className='bg-blue-600 text-white hover:bg-blue-700 px-6 py-6 md:px-8 md:py-6 rounded-lg font-semibold text-md md:text-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer'>
                    체험하기
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* 3. 배경 이미지 */}
        <div className='absolute bottom-0 inset-0 z-0 opacity-60 pointer-events-none'>
          <HeroImage />
        </div>
      </section>

      {/* 하단 여백 */}
      <div className='h-[50px]' />
    </>
  );
}
