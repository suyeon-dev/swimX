'use client';

import { Button } from '@/components/ui/button';
import { FaBloggerB, FaGithub } from 'react-icons/fa';
import { SiNaver, SiGmail } from 'react-icons/si';

export default function Footer() {
  return (
    <footer className='bg-[#f5f5f5] pb-24 py-10 md:py-12 md:pb-12 flex flex-col items-center justify-center'>
      <div className='flex gap-4 mb-4'>
        <SocialButton href='mailto:choilynne.dev@gmail.com'>
          <SiGmail className='text-white text-lg' />
        </SocialButton>

        <SocialButton href='mailto:lynne_choi@naver.com'>
          <SiNaver className='text-white text-lg' />
        </SocialButton>

        <SocialButton href='https://suyeon-dev.tistory.com/'>
          <FaBloggerB className='text-white text-lg' />
        </SocialButton>

        <SocialButton href='https://github.com/suyeon-dev'>
          <FaGithub className='text-white text-xl' />
        </SocialButton>
      </div>

      <p className='text-sm text-muted-foreground'>
        © 2025 SwimX. All rights reserved.
      </p>
    </footer>
  );
}

/** 버튼 공통 스타일 (shadcn Button 래핑) */
function SocialButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} target='_blank' rel='noopener noreferrer'>
      <Button
        variant='ghost'
        className='rounded-full w-10 h-10 bg-gray-300 hover:bg-gray-400 p-0'
      >
        {children}
      </Button>
    </a>
  );
}
