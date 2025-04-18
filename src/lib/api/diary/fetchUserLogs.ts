import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/authOptions';
import { SwimLog } from '@/types/log';

// 서버에서 로그인된 사용자의 수영일기만 가져오기
export async function fetchUserLogs(): Promise<SwimLog[]> {
  // 1. 로그인한 사용자 정보 확인
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    throw new Error('로그인이 필요합니다.');
  }

  const userId = session.user.id;

  // 2. GET 요청으로 user_id에 맞는 데이터만 요청
  const res = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/swim_logs?user_id=eq.${userId}`,
    {
      method: 'GET',
      headers: {
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
      },
    }
  );

  // 3. 실패 처리
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || '수영일기 조회 실패');
  }

  // 4. 성공 데이터 반환
  const data = await res.json();
  return data as SwimLog[];
}
