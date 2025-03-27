// [일기 작성] 기본 정보 - 운동강도 슬라이더
'use client';

import { Slider } from '@/components/ui/slider';
import { intensityLevels } from '@/types/log';
import { useEffect, useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

// 아이콘
import { FaCircleInfo } from 'react-icons/fa6';

// props 타입
interface IntensitySliderProps {
  value: number; //현재 강도 값(0~100)
  onChange: (val: number) => void; //값이 변경될 때 실행되는 함수
}

// 값에 따른 강도 라벨을 반환하는 함수
function getIntensityLabel(value: number): string {
  const current = intensityLevels.find((level) => level.value === value);
  return current?.label ?? '중'; // fallback: '중'
}

// value: 현재 운동 값
export default function IntensitySlider({
  value,
  onChange,
}: IntensitySliderProps) {
  // 현재 강도에 해당하는 라벨 상태
  const [label, setLabel] = useState('중');

  // 값이 바뀔 때마다 라벨 자동 갱신
  useEffect(() => {
    setLabel(getIntensityLabel(value));
  }, [value]);

  return (
    <TooltipProvider>
      <div className='flex items-center gap-2'>
        {/* 운동 강도 라벨 + 텍스트 */}
        <span className='font-medium whitespace-nowrap'>운동강도</span>
        <span className='text-blue-600 font-semibold w-10 flex justify-center'>
          {label}
        </span>

        {/* 슬라이더 wrapper */}
        <div className='relative w-[200px] h-6'>
          {/* 운동 강도 슬라이더바 */}
          <Slider
            value={[value]}
            min={20}
            max={100}
            step={20}
            onValueChange={(val) => onChange(val[0])}
            className='w-[200px] h-6'
          />

          {/* 구간 tick: 4줄 (20%, 40%, 60%, 80%) */}
          {[20, 40, 60, 80].map((percent, i) => (
            <div
              key={i}
              className='absolute top-0 h-full w-px bg-white opacity-80'
              style={{ left: `${percent}%` }}
            />
          ))}
        </div>

        {/* 도움말 Tooltip */}
        <Tooltip>
          <TooltipTrigger asChild>
            <FaCircleInfo />
          </TooltipTrigger>
          <TooltipContent side='right'>
            <p className='text-sm max-w-[200px]'>
              5단계 운동강도를 선택할 수 있어요
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
