'use client';

import Footer from '@/components/common/Footer';
import HeroSection from '@/components/home/HeroSection';
import ServiceIntroSection from '@/components/home/ServiceIntroSection';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session, status } = useSession(); // 현재 로그인 세션 정보 조회
  console.log('세션 정보: ', session);
  console.log('세션 상태: ', status);
  return (
    <>
      <HeroSection />
      <ServiceIntroSection />
      <Footer />
    </>
  );
}
