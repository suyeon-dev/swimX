// components/diary/AdditionalInfo.tsx
'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';

export default function AdditionalInfo() {
  const { register } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className='border-1 border-gray-200 rounded-xl px-4 py-4 pr-8 pl-8 m-4'>
      {/* 토글 버튼 */}
      <button
        type='button'
        onClick={() => setIsOpen((prev) => !prev)}
        className='flex justify-between items-center w-full'
      >
        <h2 className='text-lg font-bold'>심박수 · 페이스 · 칼로리</h2>
        {isOpen ? (
          <IoChevronUp className='text-xl text-muted-foreground' />
        ) : (
          <IoChevronDown className='text-xl text-muted-foreground' />
        )}
      </button>

      {/* 펼쳐진 내용 */}
      {isOpen && (
        <div className='mt-6 grid grid-cols-[120px_1fr] gap-y-5 gap-x-4 items-center'>
          {/* 심박수 */}
          <label>심박수</label>
          <div className='grid grid-cols-2 gap-4'>
            <div className='flex items-center gap-2'>
              <span>평균</span>
              <Input
                type='number'
                {...register('heartRateAvg')}
                className='w-24'
              />
              <span>BPM</span>
            </div>
            <div className='flex items-center gap-2'>
              <span>최고</span>
              <Input
                type='number'
                {...register('heartRateMax')}
                className='w-24'
              />
              <span>BPM</span>
            </div>
          </div>

          {/* 페이스 */}
          <label>페이스</label>
          <div className='flex items-center gap-2'>
            <Input
              type='number'
              {...register('paceMinute')}
              className='w-20'
              placeholder='00'
            />
            <p>:</p>
            <Input
              type='number'
              {...register('paceSeconds')}
              className='w-20'
              placeholder='00'
            />
            <span>/100m</span>
          </div>

          {/* 칼로리 */}
          <label>칼로리</label>
          <div className='flex items-center gap-2'>
            <Input type='number' {...register('calories')} className='w-24' />
            <span>KCAL</span>
          </div>
        </div>
      )}
    </section>
  );
}
