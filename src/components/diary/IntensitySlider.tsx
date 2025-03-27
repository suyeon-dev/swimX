// [일기 작성] 기본 정보 - 운동강도 슬라이더
'use client';

import { Slider } from '@/components/ui/slider';
import { intensityLevels } from '@/types/log';
import { useEffect, useState } from 'react';

// props 타입
interface IntensitySliderProps {
  value: number; //현재 강도 값(0~100)
  onChange: (val: number) => void; //값이 변경될 때 실행되는 함수
}

// 값에 따른 강도 라벨을 반환하는 함수
function getIntensityLabel(value: number): string {
  const current = intensityLevels.find(
    ({ range }) => value >= range[0] && value <= range[1]
  );
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
    <div className='flex items-center gap-2'>
      {/* 운동 강도 라벨 + 텍스트 */}
      <span className='font-medium whitespace-nowrap'>운동강도</span>
      <span className='text-blue-600 font-semibold'>{label}</span>

      {/* Slider UI */}
      <Slider
        value={[value]}
        min={0}
        max={100}
        step={1}
        onValueChange={(val) => onChange(val[0])}
        className='
          w-[200px]
          h-4
          relative
        '
      />
    </div>
  );
}
