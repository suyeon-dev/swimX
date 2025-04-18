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

  // 2. DB에서 사용자 ID 기반 수영일기 전체 불러오기
  const logs = await getSwimLogsByUser(userId);

  return (
    <main className='max-w-4xl mx-auto px-4'>
      {/* 경로 안내 */}
      <section className='mt-6 mb-4 '>
        <p className='text-sm text-muted-foreground'>수영일기 &gt; 아카이브</p>
      </section>

      {/* 아카이브 본문 */}
      <section>
        <h1 className='text-2xl font-bold mb-8 tracking-tight'>아카이브</h1>

        {/* 클라이언트 컴포넌트에 데이터 전달 */}
        <ArchiveList logs={logs} />
      </section>
    </main>
  );
}
