'use client';

import Link from 'next/link';
import React from 'react';
import { IoSearch } from 'react-icons/io5';
import { FaRegBell } from 'react-icons/fa6';
import { GrLanguage } from 'react-icons/gr';
import Navigation from './Navigation';
import HeaderAuthSection from '../auth/HeaderAuthSection';
import Image from 'next/image';
import MobileNavBar from './MobileNavBar';
import HamburgerMenu from './HamburgerMenu';

export default function Header() {
  // const { data: session, status } = useSession(); // 현재 로그인 세션 정보 조회

  return (
    <div className='relative z-50'>
      <header className='flex justify-between items-center px:6 sm:px-8 md:px-10 lg:px-20 py-4 md:py-6 lg:py-8 bg-white'>
        {/* ---------------- 로고 및 서비스명 ----------------*/}
        <Link href='/'>
          <div className='flex items-center'>
            {/* <div className='w-8 h-8 bg-blue-500 rounded-full'></div> */}
            <Image
              src={'/images/logo/logo-test.png'}
              width={48}
              height={48}
              alt={'logo'}
            ></Image>

            <Image
              src={'/images/logo/title.png'}
              width={100}
              height={32}
              alt={'title'}
              className='w-16 sm:w-18 md:w-24 lg:w-[100px]'
            ></Image>
          </div>
        </Link>

        {/* ---------------- 내비게이션 메뉴 ---------------- */}
        {/* PC */}
        <div className='hidden lg:flex'>
          <Navigation />
        </div>

        {/* 태블릿 */}
        <div className='hidden md:flex lg:hidden'></div>

        {/* ---------------- 유틸 모음 ----------------*/}
        <div className='flex items-center gap-6'>
          {/* 항상 표시 */}
          <button className='text-xl cursor-pointer '>
            <IoSearch />
          </button>
          <button className='text-xl cursor-pointer'>
            <FaRegBell />
          </button>
          <button className='text-xl cursor-pointer'>
            <GrLanguage />
          </button>

          {/* 햄버거 메뉴: md 이상, lg 미만 */}
          <div className='hidden md:block'>
            <HamburgerMenu />
          </div>

          {/* 인증 (로그인/로그아웃) */}
          <div className='lg:flex hidden'>
            <HeaderAuthSection />
          </div>
        </div>

        {/* 드롭다운 메뉴 */}
        {/* <Dropdown /> */}
      </header>

      {/* 모바일 전용 하단 내비게이션 바 */}
      <div className='block md:hidden'>
        <MobileNavBar />
      </div>
    </div>
  );
}
