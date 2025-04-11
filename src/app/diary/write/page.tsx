'use client';

import { SwimFormData, swimFormSchema } from '@/schemas/logSchema';
import { useSwimLogStore } from '@/store/useSwimLogStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
// 아이콘
import { IoLocationSharp } from 'react-icons/io5';
import IntensitySlider from '@/components/diary/IntensitySlider';
import LaneSelector from '@/components/diary/LaneSelector';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { toSwimLog } from '@/utils/format';
import GearSelector from '@/components/diary/GearSelector';
import Editor from '@/components/diary/Editor';
import { Input } from '@/components/ui/input';
import { showToast } from '@/components/common/Toast';

// (todo) SwimLogForm 분리
export default function WritePage() {
  const { setLog } = useSwimLogStore(); // 전역 상태 업데이트용 함수
  const router = useRouter(); // 페이지 이동을 위한 라우터 객체

  // react-hook-form 설정(useForm hook): 기본값 및 zod 유효성 검증 연결
  const methods = useForm<SwimFormData>({
    resolver: zodResolver(swimFormSchema), //zod 스키마와 연결
    defaultValues: {
      intensity: 60, // 운동강도 '중'
      gear: [], //gear 필드 초기화
      // 일기 텍스트 에디터
      title: '', // 문자열 초기화
      content: '', // tiptap HTML도 기본값
      thumbnailUrl: '', // 빈 문자열이면 controlled 유지됨
    },
  });

  // react-hook-form에서 자주 쓰이는 메서드 추출
  const {
    register, //input 요소 폼에 연결
    handleSubmit, // 폼 제출 처리 함수
    formState: { errors, isSubmitting }, //유효성 검사 에러 정보
  } = methods;

  // 폼 제출 시 실행되는 함수
  const onSubmit = async (data: SwimFormData) => {
    try {
      const newData = toSwimLog(data); //구조 변환 완료된 데이터

      // 1. zustand 전역 상태 업데이트 (현재 기록 저장)
      setLog(newData); //그대로 저장(타입은 string 기반)

      // 2. API Route로 데이터 전송
      const res = await fetch('/api/diary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData), // 새로운 수영일기 데이터 전달
      });

      if (!res.ok) {
        const text = await res.text(); // 에러 본문 받기
        let message = '수영일기 작성 실패';

        try {
          const parsed = JSON.parse(text); // {"error": "..."}
          message = parsed.error || message;
        } catch {
          message = text; // 파싱 실패 시 원문 그대로 사용
        }
        // console.error('API 응답 실패:', message);
        throw new Error(message); // 최종적으로 메시지만 throw
      }

      const result = await res.json();
      showToast.success('수영일기 등록이 완료되었습니다!');
      console.log('등록 성공', result);

      // 3. 저장 완료 후 이동
      router.push('/diary/archive');
    } catch (err) {
      showToast.error(
        '등록 중 오류가 발생했습니다: ' +
          (err instanceof Error ? err.message : String(err))
      );
    }
    console.log('제출된 값:', data);
  };

  // const intensityValue = watch('intensity');

  return (
    <>
      <main>
        <h1 className='text-xl'>일기를 써보자</h1>

        {/* (todo) SwimLogForm 분리 */}
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit, (errors) => {
              console.error('유효성 검사 실패!', errors); // 실패 로그 추가
              showToast.error('입력값을 다시 확인해주세요!');
            })}
          >
            {/* 상단 버튼 */}
            <div className='flex justify-end gap-2'>
              <button
                type='button'
                className='border-1 border-gray-200 text-blue-500 px-4 py-1 rounded cursor-pointer'
              >
                취소
              </button>
              <button
                type='submit'
                disabled={isSubmitting}
                className='bg-blue-500 text-white px-4 py-1 rounded cursor-pointer'
              >
                {isSubmitting ? '등록 중...' : '등록'}
              </button>
            </div>

            {/* 기본정보 : 컨테이너 컴포넌트로 분리하기 */}
            <section className='border-1 border-gray-200 rounded space-y-4 p-4 m-4'>
              <h2 className='text-lg font-semibold mb-2'>기본정보</h2>
              <div className='flex'>
                <label>날짜*</label>
                <input
                  type='date'
                  className='input'
                  {...register('date', { required: true })}
                />
                {errors.date && (
                  <p className='text-red-500 text-sm'>{errors.date.message}</p>
                )}
              </div>
              <div className='flex gap-4'>
                <label>수영시간*</label>
                <span>시작</span>
                <input
                  {...register('startTime')}
                  type='time'
                  className='input'
                />

                <span>종료</span>
                <input {...register('endTime')} type='time' />
                {errors.startTime && (
                  <p className='text-red-500 text-sm'>
                    {errors.startTime.message}
                  </p>
                )}
                {errors.endTime && (
                  <p className='text-red-500 text-sm'>
                    {errors.endTime.message}
                  </p>
                )}
              </div>

              <div>
                <label>수영장</label>
                <input type='text' {...register('pool')} />
                <button className='border-1 border-gray-200 rounded px-2'>
                  <div className='flex items-center gap-1 text-gray-500'>
                    <IoLocationSharp />
                    수영장 선택
                  </div>
                </button>
                {errors.pool && (
                  <p className='text-red-500 text-sm'>{errors.pool.message}</p>
                )}
              </div>

              <div className='flex items-center gap-6'>
                <div>
                  {/* (todo) 수정해야함 build 에러 발생 */}
                  <LaneSelector />
                </div>

                <div>
                  <IntensitySlider />
                </div>
              </div>

              <div>
                <label>수영거리*</label>
                <input
                  type='number'
                  {...register('distance')}
                  className='input'
                />
                <span>m</span>
                {errors.distance && (
                  <p className='text-red-500 text-sm'>
                    {errors.distance.message}
                  </p>
                )}
              </div>
              <div>
                <label>심박수</label>
                <span>평균</span>
                <input type='number' {...register('heartRateAvg')} />
                <span>BPM</span>
                <span>최고</span>
                <input type='number' {...register('heartRateMax')} />
                <span>BPM</span>
              </div>
              <div className='flex gap-2'>
                <label>페이스</label>
                <input
                  type='number'
                  {...register('paceMinute')}
                  className='input w-14'
                  placeholder='00'
                />
                <p>:</p>
                <input
                  type='number'
                  {...register('paceSeconds')}
                  className='input w-10 '
                  placeholder='00'
                />
                <span>/100m</span>
              </div>
              <div>
                <label>칼로리</label>
                <input
                  type='number'
                  {...register('calories')}
                  className='input'
                />
                <span>KCAL</span>
              </div>
            </section>

            {/* 장비 선택 */}
            <GearSelector />

            {/* 일기 */}
            <section className='border-1 border-gray-200 rounded space-y-4 p-4 m-4'>
              <h2 className='text-lg font-semibold mb-2'>일기</h2>
              {/* 제목 - 선택 항목이지만 RHF에 연결 필요 */}
              <Controller
                name='title'
                control={methods.control}
                render={({ field }) => (
                  <Input
                    placeholder='제목을 입력해 주세요.'
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />

              {/* Tiptap 에디터 연결 */}
              <Controller
                name='content'
                control={methods.control}
                render={({ field }) => (
                  <Editor
                    title={methods.watch('title') ?? ''}
                    onTitleChange={(val) => methods.setValue('title', val)} // 타이틀 연동
                    content={field.value ?? ''} // tiptap HTML
                    onContentChange={field.onChange} // RHF로 동기화
                  />
                )}
              />
            </section>
          </form>
        </FormProvider>
      </main>
    </>
  );
}
