import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DemoLoginButton from '@/components/auth/DemoLoginButton';

export default function AuthPage() {
  return (
    <section className='flex flex-col justify-center items-center min-h-screen px-4'>
      {/* 로그인 폼 헤더 로고 영역 */}
      <h2 className='text-3xl font-extrabold mb-16'>SwimX</h2>

      {/* 로그인 유지 체크박스 */}

      {/* (todo) 로그인 컨테이너 분리 */}
      <div className='w-full max-w-lg border border-gray-100 rounded-2xl p-10 relative'>
        <div className='text-sm space-x-2 absolute -top-8 right-4'>
          <input type='checkbox' />
          <label htmlFor='checkbox' className='cursor-pointer'>
            로그인 유지
          </label>
        </div>
        {/* 이메일 입력 */}
        <Input
          type='email'
          placeholder='이메일'
          className='mb-2 h-12 px-4 text-base'
        />

        {/* 비밀번호 입력 */}
        <Input
          type='password'
          placeholder='비밀번호'
          className='mb-6 h-12 px-4 text-base'
        />

        {/* 이메일 로그인 버튼 */}
        <Button className='w-full h-12 text-md font-semibold bg-blue-500 text-white hover:bg-blue-600 mb-2'>
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

        {/* 소셜 로그인 아이콘 (후순위 구현) */}
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
      </div>

      {/* 회원가입 및 비밀번호 찾기 */}
      <div className='flex justify-center gap-2  text-sm mt-6 '>
        <Link href='/auth/signup' className='hover:underline'>
          회원가입
        </Link>
        <span className='text-gray-300'>|</span>
        <Link href='/auth/reset' className='hover:underline'>
          아이디/비밀번호 찾기
        </Link>
      </div>
    </section>
  );
}
