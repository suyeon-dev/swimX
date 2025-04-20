import SignUpForm from '@/components/auth/SignUpForm';
import Link from 'next/link';
import { GoArrowUpRight } from 'react-icons/go';

export default function SignUpPage() {
  return (
    <section className='flex flex-col items-center justify-center px-4 pt-0 min-h-screen'>
      <div className='w-full max-w-xl'>
        {/* 회원가입 페이지 상단 헤더 */}
        <div className='text-center pb-6'>
          <h1 className='text-3xl font-bold mb-4'>SwimX 회원가입</h1>
          <p className='text-sm mb-4'>
            SwimX 계정을 가지고 계신가요?
            <Link
              href='/signIn'
              className='ml-1 text-blue-600 hover:underline cursor-pointer'
            >
              로그인
              <button className='text-md cursor-pointer text-blue-600'>
                <GoArrowUpRight />
              </button>
            </Link>
          </p>
        </div>

        {/* 회원가입 폼 */}
        <SignUpForm />
      </div>
    </section>
  );
}
