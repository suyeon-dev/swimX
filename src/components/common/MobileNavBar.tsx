'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  FaMapMarkedAlt,
  FaSignOutAlt,
  FaHistory,
  FaSignInAlt,
} from 'react-icons/fa';
import { FaCirclePlus } from 'react-icons/fa6';
import { MdHomeFilled } from 'react-icons/md';
import { signOut, useSession } from 'next-auth/react';

export default function MobileNavBar() {
  const pathname = usePathname(); // 현재 페이지 경로 확인
  const router = useRouter(); // 클라이언트 라우팅용 훅
  const { data: session } = useSession(); // 현재 로그인 세션 확인

  // 로그인 상태
  const authNavItem = session?.user
    ? {
        name: '로그아웃',
        icon: <FaSignOutAlt />,
        onClick: () => signOut({ callbackUrl: '/signIn' }),
      }
    : {
        name: '로그인',
        icon: <FaSignInAlt />,
        onClick: () => router.push('/signIn'),
      };

  const navItems = [
    { name: '소개', icon: <MdHomeFilled />, href: '/' },
    { name: '아카이브', icon: <FaHistory />, href: '/diary/archive' },
    { name: '일기쓰기', icon: <FaCirclePlus />, href: '/diary/write' },
    { name: '지도', icon: <FaMapMarkedAlt />, href: '/map' },
  ];

  return (
    <nav className='fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-sm flex justify-around items-center h-18 py-1'>
      {/* 내비 메뉴 */}
      {navItems.map(({ name, icon, href }) => {
        const isActive = pathname === href; // 현재 경로와 일치 여부

        return (
          <Link
            key={name}
            href={href}
            className={`
              flex flex-col items-center text-xs hover:text-blue-600
              ${
                isActive
                  ? 'text-blue-600 font-semibold'
                  : 'text-gray-500 hover:text-blue-500'
              }
            `}
          >
            {/* 아이콘 */}
            <div className='text-xl pb-1 pt-1'>{icon}</div>
            {/* 텍스트 */}
            <span>{name}</span>
          </Link>
        );
      })}

      {/* 로그인 / 로그아웃 */}
      <button
        onClick={authNavItem.onClick}
        className='flex flex-col items-center text-xs text-gray-500 hover:text-blue-500'
      >
        <div className='text-xl pb-1 pt-1'>{authNavItem.icon}</div>
        <span>{authNavItem.name}</span>
      </button>
    </nav>
  );
}
