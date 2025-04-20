import Footer from '@/components/common/Footer';
import HeroSection from '@/components/home/HeroSection';
import DiaryIntroSection from '@/components/home/DiaryIntroSection';
import ArchiveIntroSection from '@/components/home/ArchiveIntroSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <DiaryIntroSection />
      <ArchiveIntroSection />
      <Footer />
    </>
  );
}
