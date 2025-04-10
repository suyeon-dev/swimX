import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/authOptions';
import { numberToTimeString } from '@/utils/format';
import { SwimLog } from '@/types/log';

// REST API 방식으로 Supabase에 수영일기 작성 요청
export const insertSwimLog = async (data: SwimLog) => {
  // 환경변수 로딩 확인
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

  if (!serviceRoleKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is required');
  }

  console.log('Service Role Key loaded:', serviceRoleKey);

  // 1. 로그인한 사용자 정보 가져오기
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    throw new Error('로그인이 필요한 기능입니다.');
  }

  const userId = session.user.id;

  // 2. REST API로 POST 요청
  const res = await fetch(
    `${process.env.SUPABASE_PROJECT_URL}/rest/v1/swim_logs`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!, // 서버 전용 키 (절대 클라 X)
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
        Prefer: 'return=representation', // 삽입된 결과 반환
      },
      body: JSON.stringify([
        {
          user_id: userId,
          date: data.date,
          start_time: numberToTimeString(data.time.start),
          end_time: numberToTimeString(data.time.end),
          pool: data.pool,
          lane: data.lane,
          intensity: data.intensity,
          distance: data.distance,
          heart_rate_avg: data.heartRate.avg,
          heart_rate_max: data.heartRate.max,
          pace_minute: data.pace.minute,
          pace_seconds: data.pace.seconds,
          calories: data.calories,
          gear: data.gear,
        },
      ]),
    }
  );

  // 3. 오류 핸들링
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || '수영일기 작성 실패');
  }

  // 4. 성공 응답 반환
  const result = await res.json();
  console.log('REST insert 성공', result);
  return result;
};
