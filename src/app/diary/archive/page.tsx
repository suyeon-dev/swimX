// src/app/diary/archive/page.tsx
import ArchiveList from '@/containers/diary/ArchiveList';
import { getSwimLogsByUser } from '@/lib/api/diary/getSwimLogs';
import { authOptions } from '@/lib/auth/authOptions';
import { getServerSession } from 'next-auth';

export default async function ArchivePage() {
  // 1. 세션에서 사용자 정보 가져오기
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return <div>로그인이 필요합니다</div>;
  }

  const userId = session.user.id;

  // 2. 사용자 ID 기반 수영일기 조회
  const logs = await getSwimLogsByUser(userId);

  return (
    <div className='p-4'>
      <h1 className='text-xl font-bold mb-4'>아카이브</h1>
      <ArchiveList logs={logs} />
    </div>
  );
}
