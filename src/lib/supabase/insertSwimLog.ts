import { supabase } from './supabaseClient'; // supabase 클라이언트 불러오기
import { SwimFormData } from '@/schemas/logSchema'; // 폼에서 사용하는 타입 불러오기

// SwimFormData 인자로 받아 Supabase에 저장하는 함수 정의
export const insertSwimLog = async (data: SwimFormData, userId: string) => {
  // 구조분해할당으로 데이터 추출
  const {
    date,
    startTime,
    endTime,
    pool,
    lane,
    intensity,
    distance,
    heartRateAvg,
    heartRateMax,
    paceMinute,
    paceSeconds,
    calories,
    gear,
  } = data;

  // supabase에 데이터 삽입 시도
  const { error } = await supabase.from('swim_logs').insert([
    {
      // Supabase 테이블 컬럼 이름에 맞춰 데이터 매핑
      // user_id: userId,
      date,
      start_time: startTime,
      end_time: endTime,
      pool,
      lane: parseInt(lane), //zod에서 string으로 받은 값 -> number로 변환
      intensity,
      distance,
      heart_rate_avg: heartRateAvg,
      heart_rate_max: heartRateMax,
      pace_minute: paceMinute,
      pace_seconds: paceSeconds,
      calories,
      gear, // 배열(string[]) 형태로 저장
    },
  ]);

  if (error) {
    throw new Error(error.message);
  }
};
