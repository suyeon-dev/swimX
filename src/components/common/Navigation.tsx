'use client';

// import { useDropdownStore } from '@/store/useDropdownStore';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// 내비게이션 항목 타입
const NAV_ITEMS = [
  { name: '소개', href: '/' },
  { name: '일기쓰기', href: '/diary/write' },
  { name: '아카이브', href: '/diary/archive' },
  { name: '지도', href: '/map' },
];

export default function Navigation() {
  const pathname = usePathname(); // 현재 경로 가져오기
  // const { toggle } = useDropdownStore();

  return (
    <nav className='flex gap-8 font-bold text-lg'>
      {NAV_ITEMS.map(({ name, href }) => (
        <Link
          key={href}
          href={href}
          // onClick={() => {
          //   if (hasDropdown) toggle();
          // }}
          className={`nav-link ${pathname === href ? 'text-blue-500' : ''}`}
        >
          {name}
        </Link>
      ))}
    </nav>
  );
}
