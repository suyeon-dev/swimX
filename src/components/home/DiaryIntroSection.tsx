'use client';

import Image from 'next/image';

export default function ServiceIntroSection() {
  return (
    <section className='relative w-full bg-white py-20 md:py-32 overflow-hidden'>
      {/* 전체 콘텐츠: flex로 텍스트 + 이미지 정렬 */}
      <div className='relative z-10 mx-auto max-w-6xl px-4 md:flex md:items-center md:justify-between'>
        {/* 텍스트 */}
        <div className='relative z-20 text-left mb-10 md:text-left max-w-md mx-auto md:mx-0'>
          <p className='text-blue-600 font-medium text-xl mb-2'>일기 쓰기</p>
          <h2 className='text-2xl md:text-4xl font-bold leading-snug mb-6'>
            내 수영 기록, <br />
            기본 정보부터 <br className='hidden md:block' /> 건강 데이터까지{' '}
            <br />
            꼼꼼하게
          </h2>
          <p className='text-muted-foreground text-md md:text-base'>
            SwimX에 수영 기록을 기록해 보세요. <br />
            일자별 기록과 운동 강도, 장비 사용 내역은 물론 <br />
            나의 수영 루틴까지 한 번에 볼 수 있어요.
          </p>
        </div>

        {/* 왼쪽 이미지 */}
        <div className='relative w-[260px] md:w-[340px] z-2 shrink-0 mb-12 md:mb-0 '>
          <Image
            src='/images/home/mobile-left.png'
            alt='수영일기 상단'
            width={320}
            height={640}
            className='w-full h-auto object-contain'
          />
        </div>

        {/* 오른쪽 이미지 */}
        <div
          className='
            absolute md:static bottom-0 right-0
            w-[260px] md:w-[340px]
            z-0
            translate-x-12 md:translate-x-0
            translate-y-[40px] md:translate-0
            opacity-90
          '
        >
          <Image
            src='/images/home/mobile-right.png'
            alt='수영일기 하단'
            width={320}
            height={640}
            className='w-full h-auto object-contain'
          />
        </div>
      </div>
    </section>
  );
}
