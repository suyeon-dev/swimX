'use client';

import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { SignUpFormData, signUpSchema } from '@/schemas/signUpSchema';
import { zodResolver } from '@hookform/resolvers/zod';

export default function SignUpForm() {
  // useForm 훅으로 폼 상태 및 유효성 검사 연결
  const methods = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema), //zod 스키마와 연결
    defaultValues: {
      email: '',
      nickname: '',
      password: '',
      confirmPassword: '',
    },
  });

  // form 메서드 추출
  const {
    // register, //input 요소 폼에 연결
    handleSubmit, // 폼 제출 처리 함수
    control, //FormFiled에 전달할 컨트롤 객체
    // watch, // 입력값 실시간 감시
    // formState: { errors }, //유효성 검사 에러 정보
  } = methods;

  // 폼 제출 시 호출되는 함수
  const onSubmit = async (values: SignUpFormData) => {
    console.log('회원가입 정보:', values);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          nickname: values.nickname,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        // 실패 처리 (예: 중복 이메일 등)
        alert(result.error || '회원가입에 실패했습니다.');
        return;
      }

      // 성공 처리
      alert('회원가입이 완료되었습니다!');
      window.location.href = '/signIn'; // 로그인 페이지로 이동
    } catch (error) {
      console.error('회원가입 에러:', error);
      alert('서버 오류로 회원가입에 실패했습니다.');
    }
  };

  const inputClass = 'w-full h-12 px-4 border border-gray-300 rounded-xl';

  return (
    <section className='flex flex-col items-center justify-center'>
      <div className='w-full max-w-md space-y-6'>
        <Form {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            {/* 이메일 */}
            <FormField
              name='email'
              control={control}
              render={({ field }) => (
                <FormItem>
                  <div className='flex gap-2'>
                    <FormControl>
                      <Input
                        type='email'
                        placeholder='이메일'
                        className={inputClass}
                        {...field}
                      />
                    </FormControl>

                    {/* <Button
                      type='button'
                      className='bg-blue-500 text-white h-12 px-4'
                    >
                      인증하기
                    </Button> */}
                  </div>
                  <p className='text-sm text-gray-500 mt-1 pl-1'>
                    SwimX 계정으로 사용될 이메일 주소입니다.
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 비밀번호 */}
            <FormField
              name='password'
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='비밀번호'
                      className={inputClass}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 비밀번호 확인 */}
            <FormField
              name='confirmPassword'
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='비밀번호 확인'
                      className={inputClass}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 닉네임 */}
            <FormField
              name='nickname'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder='닉네임'
                      className={inputClass}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 제출 버튼 */}
            <Button
              type='submit'
              className='w-full h-12 text-md font-semibold bg-blue-500 text-white'
            >
              가입 완료
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
