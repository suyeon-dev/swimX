'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Input } from '@/components/ui/input';
import { STROKE_TYPES } from '@/types/log';
import { STROKES_KR } from '@/constants/strokes';

export default function DistanceSelector() {
  // RHF Hooks : 부모의 useForm() 설정에 접근 가능
  const { control, register, watch, setValue } = useFormContext();
  const distanceMode = watch('distanceMode'); // 거리 입력 모드 : 총 거리 / 영법별 거리
  const strokeInputMode = watch('strokeInputMode'); // 영법별 입력 모드 : m / lap
  const strokeDistances = watch('strokeDistances'); // 사용자가 입력한 영법별 거리값 객체

  // 총 거리 계산 함수
  const totalDistance =
    distanceMode === 'total'
      ? Number(watch('distance') ?? 0) // 총거리 직접 입력값 숫자로 변환하여 사용
      : Object.values(strokeDistances || {}).reduce(
          (sum, val) => sum + Number(val || 0), // 각 영법별 거리값들 숫자로 변환 후 합산
          0 // 초기값 0
        );

  return (
    <>
      <Controller
        name='distanceMode'
        control={control}
        render={({ field }) => (
          <div className='bg-slate-100 rounded-xl px-6 py-5 space-y-4'>
            {/* 1. 거리 입력 방식 선택 : 총 거리 / 영법별 거리 */}
            <RadioGroup
              value={distanceMode} // 현재 선택된 값
              onValueChange={(val) => {
                field.onChange(val); // RHF에 반영
                if (val === 'total') {
                  setValue('strokeDistances', {}); // 영법별 거리 초기화
                  setValue('strokeInputMode', 'manual'); //수치 입력 모드로 초기화
                }
              }}
              className='flex items-center justify-center gap-6'
            >
              {/* 총거리 라디오 버튼 */}
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='total' id='distance-total' />
                <label htmlFor='distance-total'>총거리</label>
              </div>
              {/* 영법별 거리 라디오 버튼 */}
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='stroke' id='distance-stroke' />
                <label htmlFor='distance-stroke'>영법별 거리</label>
              </div>
            </RadioGroup>

            {/* 2. 총거리 입력 */}
            {distanceMode === 'total' && (
              <div className='bg-white rounded-xl p-4 flex items-center gap-2'>
                <label className='text-sm text-muted-foreground w-24'>
                  총거리
                </label>
                <Input
                  type='number'
                  {...register('distance')}
                  className='flex-1'
                  placeholder='0'
                />
                <span className='text-sm'>m</span>
              </div>
            )}

            {/* 3. 영법별 거리 입력 */}
            {distanceMode === 'stroke' && (
              <div className='bg-white rounded-xl p-4 space-y-4'>
                {/* 3-1. 입력 방식 토글 */}
                <ToggleGroup
                  type='single' // 하나만 선택 가능
                  value={strokeInputMode} // 현재 선택된 모드
                  onValueChange={(val) => setValue('strokeInputMode', val)} // 모드 변경
                  className='w-full justify-start'
                >
                  <ToggleGroupItem
                    value='manual'
                    className='flex items-center gap-2 px-4 py-2'
                  >
                    수치로 입력
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value='lap'
                    className='flex items-center gap-2 px-4 py-2'
                  >
                    랩으로 입력
                  </ToggleGroupItem>
                </ToggleGroup>

                {/* 3-2. 수치로 입력 UI */}
                {strokeInputMode === 'manual' && (
                  <div className='space-y-2'>
                    {STROKE_TYPES.map((type) => (
                      <div
                        key={type}
                        className='flex items-center justify-between px-1'
                      >
                        {/* 영법 라벨 (한글) */}
                        <label className='w-24 capitalize text-muted-foreground'>
                          {STROKES_KR[type]} {/* 영어 키를 한글 라벨로 바꿈 */}
                        </label>

                        {/* 해당 영법의 거리 인풋 */}
                        <div className='flex items-center gap-2'>
                          <Input
                            type='number'
                            {...register(`strokeDistances.${type}`)} // RHF: nested 객체 형태로 등록
                            className='w-24'
                            placeholder='0'
                          />
                          <span className='text-sm'>m</span>
                        </div>
                      </div>
                    ))}

                    {/* 총거리 요약 표시 */}
                    <div className='text-right mt-6'>
                      총거리:{' '}
                      <span className='font-semibold text-blue-600'>
                        {totalDistance} m
                      </span>
                    </div>
                  </div>
                )}

                {/* 3-3. 랩으로 입력 UI (미구현) */}
                {strokeInputMode === 'lap' && (
                  <div className='text-sm text-muted-foreground'>
                    랩 입력은 추후 지원 예정입니다 🥹
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      />
    </>
  );
}

// // 매핑
// const strokeLabelKor: Record<string, string> = {
//   butterfly: '접영',
//   backstroke: '배영',
//   breaststroke: '평영',
//   freestyle: '자유형',
//   kick: '킥판',
//   etc: '기타',
// };
