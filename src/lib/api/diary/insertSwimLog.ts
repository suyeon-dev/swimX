import { SwimLog } from '@/types/log';
import { supabase } from './client'; // supabase 클라이언트 불러오기
import { numberToTimeString } from '@/utils/format';
// import { SwimFormData } from '@/schemas/logSchema'; // 폼에서 사용하는 타입 불러오기

// SwimLog 구조를 인자로 받아 Supabase에 저장하는 함수 정의
export const insertSwimLog = async (data: SwimLog) => {
  // 구조분해할당으로 데이터 추출
  const {
    date,
    time,
    pool,
    lane,
    intensity,
    distance,
    heartRate,
    pace,
    calories,
    gear,
  } = data;

  // supabase에 데이터 삽입 시도
  const { error } = await supabase.from('swim_logs').insert([
    {
      // Supabase 테이블 컬럼 이름에 맞춰 데이터 매핑
      // user_id: userId,
      date,
      start_time: numberToTimeString(time.start),
      end_time: numberToTimeString(time.end),
      pool,
      lane,
      intensity,
      distance,
      heart_rate_avg: heartRate.avg,
      heart_rate_max: heartRate.max,
      pace_minute: pace.minute,
      pace_seconds: pace.seconds,
      calories,
      gear, // 배열(string[]) 형태로 저장
    },
  ]);

  if (error) {
    throw new Error(error.message);
  }

  console.log('🛠 insertSupabase() payload', {
    gear,
    isArray: Array.isArray(gear),
  });
};
