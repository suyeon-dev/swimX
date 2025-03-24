'use client';

import { useDropdownStore } from '@/store/useDropdownStore';

export default function Dropdown() {
  const { isOpen } = useDropdownStore();
  if (!isOpen) return null;

  return (
    <>
      {/* 드롭다운 메뉴 */}
      <div className='absolute left-1/2 top-full z-20 mt-2 transform -translate-x-1/2 bg-white shadow-md rounded-md px-8 py-4 flex gap-6'>
        <a href='/diary/write'>일기작성</a>
        <a href='/diary/calendar'>캘린더</a>
        <a href='/diary/archive'>아카이브</a>
        <a href='/diary/collection'>컬렉션</a>
      </div>
    </>
  );
}
