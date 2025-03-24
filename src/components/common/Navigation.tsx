'use client';

import { useDropdownStore } from '@/store/useDropdownStore';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// 내비게이션 항목 타입
const NAV_ITEMS = [
  { name: '대시보드', href: '/dashboard' },
  { name: '수영일기', href: '/diary', hasDropdown: true },
  { name: '지도', href: '/map' },
  { name: '커뮤니티', href: '/community' },
];

export default function Navigation() {
  const pathname = usePathname(); // 현재 경로 가져오기
  const { toggle } = useDropdownStore();

  return (
    <nav className='flex gap-8 font-bold text-lg'>
      {NAV_ITEMS.map(({ name, href, hasDropdown }) => (
        <Link
          key={href}
          href={href}
          onClick={() => {
            if (hasDropdown) toggle();
          }}
          className={`nav-link ${pathname === href ? 'text-blue-500' : ''}`}
        >
          {name}
        </Link>
      ))}
    </nav>
  );
}
