'use client';

import Link from 'next/link';
import React from 'react';
import { IoSearch } from 'react-icons/io5';
import { FaRegBell } from 'react-icons/fa6';
import { GrLanguage } from 'react-icons/gr';
import Navigation from './Navigation';
import Dropdown from './Dropdown';
import HeaderAuthSection from '../auth/HeaderAuthSection';

export default function Header() {
  return (
    <div className='relative z-50'>
      <header className='flex justify-between items-center px-20 py-8 bg-white shadow-sm'>
        {/* 로고 및 서비스명 */}
        <Link href='/'>
          <div className='flex items-center gap-3'>
            <div className='w-8 h-8 bg-blue-500 rounded-full'></div>
            <h1 className='text-2xl font-bold'>SwimX</h1>
          </div>
        </Link>

        {/* 내비게이션 메뉴 */}
        <Navigation />

        {/* 유틸 모음 */}
        <div className='flex items-center gap-6'>
          <button className='text-xl cursor-pointer '>
            <IoSearch />
          </button>
          <button className='text-xl cursor-pointer'>
            <FaRegBell />
          </button>
          <button className='text-xl cursor-pointer'>
            <GrLanguage />
          </button>

          {/* 인증 (로그인/로그아웃) */}
          <HeaderAuthSection />
        </div>

        {/* 드롭다운 메뉴 */}
        <Dropdown />
      </header>
    </div>
  );
}
