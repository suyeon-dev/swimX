'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DemoLoginButton from '@/components/auth/DemoLoginButton';
import { useRouter } from 'next/navigation';
import { SignInFormData, signInSchema } from '@/schemas/signInSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { showToast } from '../common/Toast';

export default function SignInForm() {
  // 페이지 이동에 사용
  const router = useRouter();

  // useForm 훅으로 폼 상태 및 유효성 검사 연결
  const methods = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema), // zod 스키마와 연결
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // form 메서드 추출
  const { handleSubmit, control } = methods;

  // 로그인 버튼 클릭 시 실행되는 함수
  const onSubmit = async (values: SignInFormData) => {
    try {
      const response = await signIn('credentials', {
        ...values, // 이메일, 비번 전달
        redirect: false, // (!) 수동 리디렉션 제어 (signIn 내부에서 자동 이동하지 않음)
      });

      if (response?.error) {
        showToast.error('이메일 또는 비밀번호가 올바르지 않습니다.');
      } else {
        router.push('/');
      }
    } catch {
      showToast.error('서버 오류로 로그인에 실패했습니다.');
    }
  };

  return (
    <Form {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full max-w-lg border border-gray-100 rounded-2xl p-10 relative'
      >
        {/* (todo) 로그인 유지 체크박스 */}
        <FormField
          name='keepLoggedIn'
          render={() => (
            <div className='text-sm space-x-2 absolute -top-8 right-4'>
              <input id='keepLoggedIn' type='checkbox' />
              <label htmlFor='keepLoggedIn' className='cursor-pointer'>
                로그인 유지
              </label>
            </div>
          )}
        />

        {/* 이메일 입력 */}
        <FormField
          name='email'
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type='email'
                  placeholder='이메일'
                  className='mb-2 h-12 px-4 text-base'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 비밀번호 입력 */}
        <FormField
          name='password'
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type='password'
                  placeholder='비밀번호'
                  className='mb-6 h-12 px-4 text-base'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 이메일 로그인 버튼 */}
        <Button
          type='submit' //form 제출 버튼
          className='w-full h-12 text-md font-semibold bg-blue-500 text-white hover:bg-blue-600 mb-2'
        >
          이메일로 로그인하기
        </Button>

        {/* 체험하기 버튼 (테스트 계정) */}
        <DemoLoginButton />

        {/* 구분선 */}
        <div className='flex items-center my-6'>
          <div className='flex-grow h-px bg-gray-200'></div>
          <span className='text-sm px-3 text-gray-400 whitespace-nowrap'>
            다른 방법으로 로그인
          </span>
          <div className='flex-grow h-px bg-gray-200'></div>
        </div>

        {/* (todo) 소셜 로그인 아이콘 */}
        <div className='flex justify-center gap-4'>
          {/* 네이버 */}
          <button className='w-10 h-10 rounded-full bg-[#03C75A] flex items-center justify-center hover:brightness-110 transition'>
            {/* <img src='/icons/naver.svg' alt='naver' className='w-5 h-5' /> */}
          </button>

          {/* 카카오 */}
          <button className='w-10 h-10 rounded-full bg-yellow-300 flex items-center justify-center hover:brightness-110 transition'>
            {/* <img src='/icons/kakao.svg' alt='kakao' className='w-5 h-5' /> */}
          </button>

          {/* 구글 */}
          <button className='w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:brightness-98 transition'>
            {/* <img
              src='/icons/google.svg'
              alt='google'
              className='w-5 h-5 invert'
            /> */}
          </button>
        </div>
      </form>
    </Form>
  );
}
