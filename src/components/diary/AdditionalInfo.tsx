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
        <div className='mt-6 space-y-6'>
          {/* 심박수 */}
          <div className='flex flex-col sm:grid sm:grid-cols-[120px_1fr] gap-y-2 gap-x-4'>
            <label className='font-medium'>심박수</label>
            <div className='grid grid-cols-2 gap-4'>
              <div className='flex items-center gap-2'>
                <span className='text-md'>평균</span>
                <Input
                  type='number'
                  {...register('heartRateAvg')}
                  className='w-24'
                  placeholder='--'
                />
                <span className='text-sm'>BPM</span>
              </div>
              <div className='flex items-center gap-2'>
                <span className='text-md'>최고</span>
                <Input
                  type='number'
                  {...register('heartRateMax')}
                  className='w-24'
                  placeholder='--'
                />
                <span className='text-sm'>BPM</span>
              </div>
            </div>
          </div>

          {/* 페이스 */}
          <div className='flex flex-col sm:grid sm:grid-cols-[120px_1fr] gap-y-2 gap-x-4'>
            <label className='font-medium'>페이스</label>
            <div className='flex items-center gap-2'>
              <Input
                type='number'
                {...register('paceMinute')}
                className='w-20'
                placeholder='00'
              />
              <span>:</span>
              <Input
                type='number'
                {...register('paceSeconds')}
                className='w-20'
                placeholder='00'
              />
              <span className=' text-muted-foreground'>/100m</span>
            </div>
          </div>

          {/* 칼로리 */}
          <div className='flex flex-col sm:grid sm:grid-cols-[120px_1fr] gap-y-2 gap-x-4'>
            <label className='font-medium'>칼로리</label>
            <div className='flex items-center gap-2'>
              <Input
                type='number'
                {...register('calories')}
                className='w-24'
                placeholder='--'
              />
              <span className=' text-muted-foreground'>KCAL</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
