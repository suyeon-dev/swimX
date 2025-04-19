'use client';

import { Button } from '@/components/ui/button';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Link from 'next/link';

export default function CommingSoon() {
  return (
    <div className='flex flex-col md:flex-row items-center justify-center md:py-40 py-20 px-6 gap-8'>
      {/* 텍스트 영역 */}
      <div className='text-center md:text-left max-w-md'>
        <h1 className='text-2xl md:text-3xl font-extrabold text-blue-600 mb-4 whitespace-nowrap'>
          개발 중인 기능입니다. 곧 만나요!
        </h1>
        <p className='text-sm text-muted-foreground mb-2'>
          Swim X를 찾아주셔서 감사합니다.
        </p>
        <p className='text-sm text-muted-foreground mb-6'>
          대신 아래 페이지를 확인해 보세요.
        </p>

        {/* 버튼 그룹 */}
        <div className='flex flex-wrap justify-center md:justify-start gap-2'>
          <Link href='/'>
            <Button variant='outline' className='rounded-full'>
              서비스 소개
            </Button>
          </Link>
          <Link href='/signIn'>
            <Button variant='outline' className='rounded-full'>
              체험해보기
            </Button>
          </Link>
          <a
            href='https://github.com/suyeon-dev'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Button variant='outline' className='rounded-full'>
              만든 사람
            </Button>
          </a>
        </div>
      </div>

      {/* 애니메이션 영역 */}
      <div className='w-full max-w-sm md:max-w-md'>
        <DotLottieReact
          src='https://lottie.host/57f0e98c-229d-41e1-9a36-1ea9eabdf4ae/YdyG8cL4w1.lottie'
          loop
          autoplay
        />
      </div>
    </div>
  );
}
