import { SwimLog, SwimLogRaw } from '@/types/log';

export async function getSwimLogsByUser(userId: string): Promise<SwimLog[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/swim_logs?user_id=eq.${userId}&order=date.desc`,
    {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
      },
      cache: 'no-store',
    }
  );

  if (!res.ok) throw new Error('수영일기 조회 실패');

  const raw: SwimLogRaw[] = await res.json();

  // snake_case → camelCase 매핑
  const data: SwimLog[] = raw.map((item) => ({
    date: item.date,
    startTime: item.start_time, // 문자열 'HH:mm:ss'
    endTime: item.end_time,
    pool: item.pool,
    lane: item.lane,
    intensity: item.intensity,
    distanceMode: item.distance_mode,
    distance: item.distance,
    strokeInputMode: item.stroke_input_mode,
    strokeDistances: item.stroke_distances,
    heartRate: {
      avg: item.heart_rate_avg,
      max: item.heart_rate_max,
    },
    pace: {
      minute: item.pace_minute,
      seconds: item.pace_seconds,
    },
    calories: item.calories,
    gear: item.gear,
    content: item.content,
    title: item.title,
    thumbnailUrl: item.thumbnail_url,
  }));

  return data;
}
