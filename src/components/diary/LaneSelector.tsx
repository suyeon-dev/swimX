'use client';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

export default function LaneSelector() {
  const { watch, setValue, register } = useFormContext();
  const selectedLane = watch('lane');
  const [showInput, setShowInput] = useState(false);

  // 기본값 설정 (25m)
  useEffect(() => {
    if (!selectedLane) {
      setValue('lane', 25);
    }
  }, [selectedLane, setValue]);

  // 기타 선택 시 인풋창
  useEffect(() => {
    setShowInput(selectedLane === '기타');
  }, [selectedLane]);

  return (
    <div className='flex items-center gap-4'>
      <label className=' w-14'>레인</label>
      <ToggleGroup
        type='single'
        value={selectedLane}
        onValueChange={(val) => val && setValue('lane', val)}
        className='bg-muted rounded'
      >
        <ToggleGroupItem value='25' className='px-4'>
          25m
        </ToggleGroupItem>
        <ToggleGroupItem value='50' className='px-4'>
          50m
        </ToggleGroupItem>
        <ToggleGroupItem value='기타' className='px-4'>
          기타
        </ToggleGroupItem>
      </ToggleGroup>

      {/* 기타 선택 시 인풋창 */}
      {showInput && (
        <>
          <input
            type='text'
            placeholder='레인 입력'
            className='input ml-2 w-[60px]'
            {...register('customLane')}
          />
          m
        </>
      )}
    </div>
  );
}
