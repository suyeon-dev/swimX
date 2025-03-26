'use client';

import { supabase } from '@/lib/supabase/supabaseClient';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

// (todo) util로 분리
import { format, parseISO } from 'date-fns'; //라이브러리
import ko from 'date-fns/locale/ko'; //한국어 요일 포맷

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

export default function ArchivePage() {
  // 상태 정의 : Supabase에서 불러온 수영 기록들 저장
  const [logs, setLogs] = useState<SwimLog[]>([]);
  console.log('logs:', logs);

  // 마운트 시 supabase에서 데이터 불러오기
  useEffect(() => {
    const fetchLogs = async () => {
      const { data, error } = await supabase
        .from('swim_logs')
        .select('*')
        .order('date', { ascending: false }); //최신날짜 순

      if (error) {
        console.error('Supabase 에러:', error.message);
        return;
      }

      if (data) {
        console.log('Supabase 데이터:', data);
        setLogs(data); //상태 업데이트
      }
    };

    fetchLogs();
  }, []);

  // (!) 날짜별로 수영 기록을 묶기 위한 그룹핑
  const groupedByDate = logs.reduce<Record<string, SwimLog[]>>((acc, log) => {
    const key = log.date; // '2025-03-17' 같은 문자열
    if (!acc[key]) acc[key] = []; // 해당 날짜 키가 없으면 초기화
    acc[key].push(log); // 배열에 추가
    return acc;
  }, {});

  return (
    <div>
      {/* 상단 헤더 */}
      <div>
        <h1 className='text-xl font-bold'>아카이브</h1>
        <button>
          <Link href='/diary/write'>작성</Link>
        </button>
      </div>

      {/* 수영일기 타임라인 (날짜별 그룹 출력) */}
      {Object.entries(groupedByDate).map(([date, logs]) => (
        <div key={date} className='space-y-1 py-2'>
          {/* 수영일기 카드 헤더(일시, 장소, 더보기 버튼) */}
          <div className='flex gap-2'>
            <span>
              {format(parseISO(date), 'M월 d일 EEEE', { locale: ko })}
            </span>

            {logs.map((log) => (
              <div
                key={log.id}
                className='flex text-gray-400 gap-2 items-center text-sm'
              >
                {/* 수영장명, 수영 시작 시간 상단 정보 */}
                <span>{log.start_time}</span>
                <div className='flex items-center gap-1 '>
                  <IoLocationSharp />
                  <span>{log.pool ?? '수영장 정보 없음'}</span>
                </div>
              </div>
            ))}
          </div>

          {/* 수영일기 주요 정보(거리, 수영 시간, 운동 강도)*/}
          {logs.map((log) => (
            <div key={log.id} className='flex gap-6'>
              <div className='flex gap-2 items-center'>
                <div className='font-extrabold text-lg text-blue-600'>
                  {log.distance.toLocaleString()} m
                </div>
                <div className='text-sm text-gray-500'>
                  {toOneDecimal(log.distance / 50)} 바퀴
                </div>
              </div>
              <div className='font-bold text-lg  text-blue-600'>
                <span> {getDurationFormat(log.start_time, log.end_time)}</span>
              </div>
              <div className='font-bold text-lg  text-blue-600'>
                <span> {log.intensity}</span>
              </div>
            </div>
          ))}

          {/* 추가 정보 (장비, 업적, 일기 작성 여부) */}
        </div>
      ))}
    </div>
  );
}
