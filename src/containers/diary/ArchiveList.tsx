'use client';

// (todo) util로 분리
import { format, parseISO } from 'date-fns'; //라이브러리
import { ko } from 'date-fns/locale/ko'; //한국어 요일 포맷
//아이콘
import { IoLocationSharp } from 'react-icons/io5';
import { toOneDecimal } from '@/utils/math';
import { getDurationFormat } from '@/utils/format';

// supabase에서 불러올 수영 기록 타입 정의
interface SwimLog {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  pool: string | null;
  lane: number;
  intensity: number;
  distance: number;
  gear: string[] | null;
}

export default function ArchiveList({ logs }: { logs: SwimLog[] }) {
  // (!) 날짜별로 수영 기록을 묶기 위한 그룹핑
  const grouped = logs.reduce<Record<string, SwimLog[]>>((acc, log) => {
    const key = log.date; // '2025-03-17' 같은 문자열
    if (!acc[key]) acc[key] = []; // 해당 날짜 키가 없으면 초기화
    acc[key].push(log); // 배열에 추가
    return acc;
  }, {});

  return (
    <div>
      {/* 수영일기 타임라인 (날짜별 그룹 출력) */}
      {Object.entries(grouped).map(([date, logs]) => (
        <div key={date} className='space-y-1 py-2'>
          {/* 수영일기 카드 헤더(일시, 장소, 더보기 버튼) */}
          <div className='flex gap-2'>
            <span className='font-bold'>
              {format(parseISO(date), 'M월 d일 EEEE', { locale: ko })}
            </span>
          </div>

          {/* 수영일기 주요 정보(거리, 수영 시간, 운동 강도)*/}
          {logs.map((log) => (
            <div key={log.id} className='space-y-1'>
              <div className='flex text-gray-400 gap-2 items-center text-sm'>
                <span>{log.start_time}</span>
                <div className='flex items-center gap-1'>
                  <IoLocationSharp />
                  <span>{log.pool ?? '수영장 정보 없음'}</span>
                </div>
              </div>

              <div className='flex gap-6'>
                <div className='flex gap-2 items-center'>
                  <div className='font-extrabold text-lg text-blue-600'>
                    {log.distance.toLocaleString()} m
                  </div>
                  <div className='text-sm text-gray-500'>
                    {toOneDecimal(log.distance / 50)} 바퀴
                  </div>
                </div>
                <div className='font-bold text-lg text-blue-600'>
                  {getDurationFormat(log.start_time, log.end_time)}
                </div>
                <div className='font-bold text-lg text-blue-600'>
                  {log.intensity}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* 추가 정보 (장비, 업적, 일기 작성 여부) */}
    </div>
  );
}
