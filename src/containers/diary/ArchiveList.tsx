'use client'; // 클라이언트 컴포넌트 지정

import { SwimLog } from '@/types/log'; // 수영기록 타입
import { format } from 'date-fns'; // 날짜 포맷용
import { ko } from 'date-fns/locale'; // 한국어 포맷 지원
import { LogCard } from '@/components/archive/LogCard';

interface Props {
  logs: SwimLog[]; // 상위 컴포넌트에서 받아온 로그 배열
}

export default function ArchiveList({ logs }: Props) {
  // 1. 날짜별로 기록들을 그룹화 (reduce 사용)
  const grouped = logs.reduce((acc, log) => {
    const date = log.date;
    if (!acc[date]) acc[date] = [];
    acc[date].push(log);
    return acc;
  }, {} as Record<string, SwimLog[]>);

  // 2. UI 렌더링
  return (
    <div className='relative space-y-8 md:pl-[80px]'>
      {/* PC에서만 보이는 세로 선 */}
      <div className='hidden md:block absolute left-[64px] top-0 h-full border-l border-gray-200' />
      {/* 날짜별 그룹 반복 */}
      {Object.entries(grouped).map(([date, logs]) => (
        <div key={date} className='relative'>
          {/* PC : 타임라인 날짜 점 + 텍스트 */}
          <div className='hidden md:flex items-center gap-2 absolute -left-[72px] top-10'>
            <span className='text-sm font-semibold'>
              {format(new Date(date), `d(EEE)`, { locale: ko })}
            </span>
            <div className='w-4 h-4 rounded-full bg-gray-300' />
          </div>

          {/* 해당 날짜의 로그 카드 */}
          <div className='space-y-6 md:pl-4 mt-4'>
            {logs.map((log) => (
              <LogCard key={log.startTime} log={log} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
