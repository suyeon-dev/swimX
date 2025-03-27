'use client';

import { SwimFormData, swimFormSchema } from '@/schemas/logSchema';
import { useSwimLogStore } from '@/store/useSwimLogStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { insertSwimLog } from '@/lib/supabase/insertSwimLog'; //삽입 함수
// 아이콘
import { IoLocationSharp } from 'react-icons/io5';
import { HiOutlinePhotograph } from 'react-icons/hi';
import IntensitySlider from '@/components/diary/IntensitySlider';

// (todo) SwimLogForm 분리
export default function WritePage() {
  const { setLog } = useSwimLogStore(); // 전역 상태 업데이트용 함수
  const router = useRouter(); // 페이지 이동을 위한 라우터 객체

  // react-hook-form 사용 설정: zodResolver로 유효성 검사를 zod 기반으로 적용
  const {
    register, //input 요소 폼에 연결
    handleSubmit, // 폼 제출 처리 함수
    watch,
    setValue, // slider에서 사용
    formState: { errors }, //유효성 검사 에러 정보
  } = useForm<SwimFormData>({
    resolver: zodResolver(swimFormSchema), //zod 스키마와 연결,
    defaultValues: {
      intensity: 50, // 운동강도 '중'
    },
  }); //useForm 훅을 제네릭 타입과 함께 사용

  // 폼 제출 시 실행되는 함수
  const onSubmit = async (data: SwimFormData) => {
    try {
      // 1. zustand 전역 상태 업데이트 (현재 기록 저장)
      setLog(data);

      // 2. Supabase에 데이터 저장
      await insertSwimLog(data);

      // 3. 저장 완료 후 이동
      router.push('/diary/archive');
    } catch (err) {
      alert('등록 중 오류가 발생했습니다: ' + err);
    }
    console.log('제출된 값:', data);
  };

  const intensityValue = watch('intensity');

  return (
    <div>
      <h1 className='text-xl'>일기를 써보자</h1>

      {/* (todo) SwimLogForm 분리 */}
      <form onSubmit={handleSubmit(onSubmit)}>
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
            className='bg-blue-500 text-white px-4 py-1 rounded cursor-pointer'
          >
            등록
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
            <input {...register('startTime')} type='time' className='input' />

            <span>종료</span>
            <input {...register('endTime')} type='time' />
            {errors.startTime && (
              <p className='text-red-500 text-sm'>{errors.startTime.message}</p>
            )}
            {errors.endTime && (
              <p className='text-red-500 text-sm'>{errors.endTime.message}</p>
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

          <div className='flex items-center'>
            <div>
              <label>레인*</label>
              {/* (todo) 수정해야함 build 에러 발생 */}
              <select {...register('lane')} className='select'>
                <option value='25'>25m</option>
                <option value='50'>50m</option>
              </select>
            </div>

            <div>
              <IntensitySlider
                value={intensityValue}
                onChange={(val) => setValue('intensity', val)} //react-hook-form에 값 반영
              />
            </div>
          </div>

          <div>
            <label>수영거리*</label>
            <input type='number' {...register('distance')} className='input' />
            <span>m</span>
            {errors.distance && (
              <p className='text-red-500 text-sm'>{errors.distance.message}</p>
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
            <input type='number' {...register('calories')} className='input' />
            <span>KCAL</span>
          </div>
        </section>

        <section className='border-1 border-gray-200 rounded space-y-4 p-4 m-4'>
          <h2 className='text-lg font-semibold mb-2'>장비</h2>
          {/* 복수 선택 가능 */}
          <div className='flex space-x-3'>
            {['킥판', '숏핀', '롱핀', '패들', '스노클'].map((item) => (
              <label key={item}>
                <input type='checkbox' value={item} {...register('gear')} />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </section>

        {/* 일기 */}
        <section className='border-1 border-gray-200 rounded space-y-4 p-4 m-4'>
          <h2 className='text-lg font-semibold mb-2'>일기</h2>
          <div>(todo) 에디터 추가하기</div>
        </section>

        {/* 사진 업로드 */}
        <section className='border-1 border-gray-200 rounded space-y-4 p-4 m-4'>
          <h2 className='text-lg font-semibold mb-2'>오늘의 사진</h2>
          <div className='flex flex-col border-1 border-gray-400 border-dashed p-10 items-center justify-center'>
            <div className='text-3xl text-gray-500'>
              <HiOutlinePhotograph />
            </div>
            <div className=' text-gray-500'>
              Drag and drop photos
              <br />
              or click to upload
            </div>
          </div>
        </section>
      </form>
    </div>
  );
}
