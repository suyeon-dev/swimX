'use client';

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet'; // shadcn/ui의 Sheet 컴포넌트
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { IoMenu, IoClose } from 'react-icons/io5';
import Link from 'next/link';
import { useState } from 'react';

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false); // Sheet 열림 상태 제어
  const { data: session } = useSession(); // 로그인 상태 확인
  const router = useRouter(); // 클라이언트 라우팅

  // 메뉴 항목 정의 (공통)
  const navItems = [
    { name: '소개', href: '/' },
    { name: '일기쓰기', href: '/diary/write' },
    { name: '아카이브', href: '/diary/archive' },
    { name: '지도', href: '/map' },
  ];

  // 로그인 여부 확인
  const authItem = session?.user
    ? {
        name: '로그아웃',
        onClick: () => {
          setOpen(false);
          signOut({ callbackUrl: '/signIn' });
        },
      }
    : {
        name: '로그인',
        onClick: () => {
          setOpen(false);
          router.push('/signIn');
        },
      };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* 햄버거 버튼 */}
      <SheetTrigger asChild>
        <button className='md:block lg:hidden text-2xl'>
          <IoMenu />
        </button>
      </SheetTrigger>

      {/* 햄버거 메뉴 아이템 */}
      <SheetContent
        side='right'
        className='w-80 justify-between flex flex-col h-full py-4'
      >
        <div>
          <SheetHeader>
            <SheetTitle className='mt-8 text-xl font-bold'></SheetTitle>
          </SheetHeader>

          {/* 닫기 버튼 커스텀 (더 큰 X) */}
          {/* <SheetClose asChild>
            <button
              className='absolute top-4 right-4 text-3xl text-gray-500 hover:text-gray-700 transition-colors'
              aria-label='메뉴 닫기'
            >
              <IoClose /> 
            </button>
          </SheetClose> */}

          <div className='flex flex-col gap-4 '>
            {navItems.map(({ name, href }) => (
              <Link
                key={name}
                href={href}
                onClick={() => setOpen(false)}
                className='text-xl font-semibold hover:text-blue-500 px-8'
              >
                {name}
              </Link>
            ))}
          </div>
        </div>

        {/* 로그인/로그아웃 버튼 */}
        <div className='border-t flex justify-center items-center'>
          <button
            onClick={authItem.onClick}
            className='w-[90%] text-lg font-semibold p-2 mt-4 mb-4 mr-2 bg-gray-100  hover:bg-gray-200 rounded text-center justify-end'
          >
            {authItem.name}
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
