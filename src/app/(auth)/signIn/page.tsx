'use client';

import SignInForm from '@/components/auth/SigninForm';
import Link from 'next/link';
import { GoArrowUpRight } from 'react-icons/go';

export default function SignInPage() {
  return (
    <section className='flex flex-col justify-center items-center min-h-screen px-4'>
      {/* 로그인 폼 헤더 영역 */}
      <div className='text-center w-full max-w-xl mb-8'>
        <h2 className='text-3xl font-extrabold mb-4'>SwimX</h2>
        <p className='text-sm mb-4'>
          더 편한 수영 기록, SwimX에서 시작해보세요!
          <Link
            href='/signUp'
            className='ml-1 inline-flex items-center text-blue-600 hover:underline cursor-pointer'
          >
            회원가입
            <button className='text-md cursor-pointer text-blue-600'>
              <GoArrowUpRight />
            </button>
          </Link>
        </p>
      </div>
      <SignInForm />
      {/* 회원가입 및 비밀번호 찾기 */}
      <div className='flex justify-center gap-2  text-sm mt-6 '>
        <Link href='/signUp' className='hover:underline'>
          회원가입
        </Link>
        <span className='text-gray-300'>|</span>
        <Link href='/reset' className='hover:underline'>
          아이디/비밀번호 찾기
        </Link>
      </div>
    </section>
  );
}
