// src/app/diary/archive/page.tsx (일부만)
'use client';

import { IoCalendarClearOutline, IoAdd } from 'react-icons/io5';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

export default function ArchiveHeader() {
  const router = useRouter();

  return (
    <div className='flex items-center justify-between mb-8'>
      {/* 제목 */}
      <h1 className='text-2xl font-bold tracking-tight'>아카이브</h1>

      {/* 버튼 그룹 */}
      <div className='flex gap-2'>
        {/* 캘린더 버튼 */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant='outline'
                className='flex items-center gap-1 text-blue-600 border-blue-200  hover:bg-gray-100 cursor-not-allowed'
                // onClick={() => router.push('/diary/calendar')}
              >
                <IoCalendarClearOutline className='w-4 h-4' />
                <span>캘린더</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side='top'>
              <p className='text-sm whitespace-nowrap'>
                개발 중인 기능입니다. 곧 만나요!
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* 작성 버튼 */}
        <Button
          className='cursor-pointer flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white'
          onClick={() => router.push('/diary/write')}
        >
          <IoAdd className='w-4 h-4' />
          <span>작성</span>
        </Button>
      </div>
    </div>
  );
}
