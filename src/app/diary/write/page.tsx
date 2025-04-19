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
import DistanceSelector from '@/components/diary/DistanceSelector';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import AdditionalInfo from '@/components/diary/AdditionalInfo';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

// (todo) SwimLogForm 분리
export default function WritePage() {
  const { setLog } = useSwimLogStore(); // 전역 상태 업데이트용 함수
  const router = useRouter(); // 페이지 이동을 위한 라우터 객체
  const { status } = useSession(); // loading/authenticated/unauthenticated

  // react-hook-form 설정(useForm hook): 기본값 및 zod 유효성 검증 연결
  const methods = useForm<SwimFormData>({
    resolver: zodResolver(swimFormSchema), //zod 스키마와 연결
    defaultValues: {
      lane: '25',
      intensity: 60, // 운동강도 '중'
      distanceMode: 'total',
      strokeInputMode: 'manual',
      gear: [], //gear 필드 초기화
      // 일기 텍스트 에디터
      title: '', // 문자열 초기화
      content: '', // tiptap HTML도 기본값
      thumbnailUrl: '', // 빈 문자열이면 controlled 유지됨
    },
  });

  // 로그인 여부
  useEffect(() => {
    if (status === 'unauthenticated') {
      showToast.info('로그인이 필요한 서비스입니다.');
      router.replace('/signIn'); // replace로 뒤로가기 방지
    }
  }, [status, router]);

  if (status === 'loading') return null; // 세션 상태 확인 중
  if (status === 'unauthenticated') return null; // 이미 useEffect로 처리됨

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

        throw new Error(message); // 최종적으로 메시지만 throw
      }

      showToast.success('수영일기 등록이 완료되었습니다!');

      // 3. 저장 완료 후 이동
      router.push('/diary/archive');
    } catch (err) {
      showToast.error(
        '등록 중 오류가 발생했습니다: ' +
          (err instanceof Error ? err.message : String(err))
      );
    }
  };

  // const intensityValue = watch('intensity');

  return (
    <>
      <main className='max-w-4xl mx-auto px-4'>
        <section className='mt-6 mb-4 '>
          <p className='text-sm text-muted-foreground'>수영일기 &gt; 작성</p>
        </section>

        {/* (todo) SwimLogForm 분리 */}
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit, () => {
              showToast.error('입력값을 다시 확인해주세요!');
            })}
          >
            {/* 페이지 제목 & 상단 버튼 */}
            <div className='flex justify-between items-center'>
              <h1 className='text-2xl font-bold tracking-tight'>일기쓰기</h1>
              <div className='flex justify-end gap-2'>
                <button
                  type='button'
                  className='border-1 border-gray-200 text-blue-600 px-4 py-1 rounded cursor-pointer'
                >
                  취소
                </button>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='bg-blue-600 text-white px-4 py-1 rounded cursor-pointer'
                >
                  {isSubmitting ? '등록 중...' : '등록'}
                </button>
              </div>
            </div>

            {/* 기본정보 (todo) 컨테이너 컴포넌트로 분리하기 */}
            <section className='border-1 border-gray-200 rounded-xl space-y-4 p-8 m-4'>
              <h2 className='text-xl font-bold mb-4'>기본정보</h2>
              <div className='grid grid-cols-[120px_1fr] gap-y-5 gap-x-4 items-center'>
                {/* 날짜 */}
                <label>날짜*</label>
                <Input
                  type='date'
                  className='input w-1/2'
                  {...register('date', { required: true })}
                />

                {errors.date && (
                  <p className='text-red-500 text-sm'>{errors.date.message}</p>
                )}

                {/* 수영시간 */}
                <label>수영시간*</label>
                <div className='flex items-center gap-5'>
                  <Input
                    type='time'
                    {...register('startTime')}
                    className='w-32'
                  />
                  <span>–</span>
                  <Input
                    type='time'
                    {...register('endTime')}
                    className='w-32'
                  />
                </div>
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

                {/* 수영장 */}
                <label>수영장</label>
                <div className='flex items-center gap-2'>
                  <Input type='text' {...register('pool')} className='w-1/2' />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type='button'
                          disabled
                          className='flex items-center text-sm text-muted-foreground border border-gray-300 px-3 py-2 rounded-md opacity-60 cursor-not-allowed whitespace-nowrap'
                        >
                          <IoLocationSharp className='mr-1' />
                          수영장 찾기
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side='top'>
                        <p className='text-sm whitespace-nowrap'>
                          개발 중인 기능입니다. 곧 만나요!
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                {errors.pool && (
                  <p className='text-red-500 text-sm'>{errors.pool.message}</p>
                )}

                {/* 레인 + 운동강도 */}

                {/* PC, 태블릿 구조 (768 이상) */}
                <label className='hidden sm:flex'>레인</label>
                <div className='hidden sm:flex items-center '>
                  <div className='flex-1 min-w-0'>
                    <LaneSelector />
                  </div>
                  <div className='flex items-center flex-1 min-w-0'>
                    <label className='whitespace-nowrap'>운동강도</label>
                    <IntensitySlider />
                  </div>
                </div>

                {/* 모바일 구조 */}
                <label className='flex sm:hidden'>레인</label>
                <div className='flex flex-col gap-4 sm:hidden'>
                  <LaneSelector />
                </div>
                <label className='flex sm:hidden'>운동강도</label>
                <div className='flex flex-col gap-4 sm:hidden py-2'>
                  <IntensitySlider />
                </div>

                {/* 수영 거리 */}
                <div className='flex items-start gap-4 col-span-2'>
                  <label className='w-[120px] pt-2  shrink-0'>수영거리*</label>
                  <div className='w-full min-w-[400px]'>
                    <DistanceSelector />
                    {errors.distance && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.distance.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* 장비*/}
                <div className='flex items-start gap-4 col-span-2'>
                  <label className='w-[120px] pt-2  shrink-0'>장비</label>
                  <GearSelector />
                </div>
              </div>
            </section>

            {/* 추가 정보 : 심박수, 페이스, 칼로리 */}
            <AdditionalInfo />

            {/* 일기 */}
            <section className='border-1 border-gray-200 rounded-xl space-y-4 p-8 m-4'>
              <h2 className='text-xl font-bold mb-4'>일기</h2>
              {/* 제목 - 선택 항목이지만 RHF에 연결 필요!!! */}
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

            <div className='m-4 flex'>
              <button
                type='submit'
                disabled={isSubmitting}
                className='text-lg flex-1 bg-blue-600 text-white py-3 rounded cursor-pointer mb-20'
              >
                {isSubmitting ? '등록 중...' : '등록하기'}
              </button>
            </div>
          </form>
        </FormProvider>
      </main>
    </>
  );
}
