import Image from 'next/image';

export default function ArchiveIntroSection() {
  return (
    <section className='relative w-full bg-white py-20 md:py-32 overflow-hidden'>
      <div className='relative z-10 mx-auto max-w-6xl px-4 flex flex-col-reverse md:flex-row items-center gap-12'>
        {/* 이미지*/}
        <div className='w-full md:w-2/3'>
          <Image
            src='/images/home/pc-archive.png'
            alt='수영 기록 아카이빙 UI'
            width={800}
            height={600}
            className='w-full h-auto rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.08)]'
          />
        </div>

        {/* 텍스트 */}
        <div className='w-full md:w-1/3 text-center md:text-left mb-6 md:mb-0'>
          <p className='text-blue-600 font-medium text-xl mb-2'>
            기록 아카이빙
          </p>
          <h2 className='text-2xl md:text-4xl font-bold leading-snug mb-6'>
            영법별 수영 거리, <br className='hidden md:inline' />
            한눈에 확인!
          </h2>
          <p className='text-muted-foreground text-md md:text-base leading-relaxed'>
            SwimX에서는 수영 기록을 타임라인 형태로 관리할 수 있어요. <br />
            하루 수영 거리와 강도, 사용 장비는 물론 <br />
            영법별 수영 거리도 막대 차트로 확인해보세요.
          </p>
        </div>
      </div>
    </section>
  );
}
