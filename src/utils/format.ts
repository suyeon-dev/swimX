import { SwimFormData } from '@/schemas/logSchema';
import { SwimLog } from '@/types/log';
import { addDays, differenceInMinutes, parse } from 'date-fns';
// ------------ 총 수영시간 ------------
// 1. hh:mm:ss 형식의 문자열을 Date 객체로 변환
function parseTime(time: string): Date {
  return parse(time, 'HH:mm:ss', new Date(0));
}

// 2. 총 수영 시간
// DB에서 받은 start_time / end_time (문자열) 받아 총 운동시간 계산
export const getDurationFormat = (
  startTime: string | undefined,
  endTime: string | undefined
): string => {
  if (!startTime || !endTime) return '-';

  // 시작, 종료 시간의 문자열을 date 객체로 변환
  const start = parseTime(startTime);
  let end = parseTime(endTime);

  // 종료 시간이 시작 시간보다 빠르면 자정을 넘긴 것으로 간주 -> 하루 더함
  if (end < start) {
    end = addDays(end, 1);
  }

  // 두 시간의 차이를 분 단위로 계산
  const totalMinutes = differenceInMinutes(end, start);

  // m분 형식으로 반환
  return `${totalMinutes} min`;
};

// ------------ SwimFormData(Form) -> SwimLog 구조 변환 함수 ------------
export const toSwimLog = (data: SwimFormData): SwimLog => {
  // lane 변환: '기타'일 경우 숫자 변환
  const lane =
    data.lane === '기타' && data.customLane
      ? Number(data.customLane)
      : Number(data.lane);

  // distance 계산
  let distance = data.distance;

  // distanceMode='stroke'인 경우 strokeDistances의 합산값 계산
  // zod에서 string -> num으로 변환해서 val의 Num 타입 보장 확실함
  if (data.distanceMode === 'stroke' && data.strokeDistances) {
    distance = Object.values(data.strokeDistances).reduce(
      (sum, val) => sum + val,
      0
    );
  }

  return {
    date: data.date,
    startTime: timeStringToNumber(data.startTime),
    endTime: timeStringToNumber(data.endTime),
    pool: data.pool ?? '',
    lane,
    intensity: intensityToText(data.intensity),
    distanceMode: data.distanceMode,
    distance, // 총거리 입력값 or stroke 합산값
    strokeInputMode: data.strokeInputMode,
    strokeDistances: data.strokeDistances ?? undefined,
    heartRate: {
      avg: data.heartRateAvg ?? 0,
      max: data.heartRateMax ?? 0,
    },
    pace: {
      minute: data.paceMinute ?? 0,
      seconds: data.paceSeconds ?? 0,
    },
    calories: data.calories ?? 0,
    gear: data.gear ?? [],
    content: data.content ?? '',
    title: data.title ?? '',
    thumbnailUrl: data.thumbnailUrl ?? null,
  };
};

// 보조 함수들
const timeStringToNumber = (time: string): number => {
  const [h, m] = time.split(':');
  return Number(h) * 100 + Number(m);
};

const intensityToText = (value: number): string => {
  if (value <= 20) return '최하';
  if (value <= 40) return '하';
  if (value <= 60) return '중';
  if (value <= 80) return '상';
  return '최상';
};

// 숫자 -> 'HH:mm:00' 문자열로 변환해서 supabase에 저장하기
export const numberToTimeString = (num: number): string => {
  const hour = Math.floor(num / 100);
  const minute = num % 100;
  return `${hour.toString().padStart(2, '0')}:${minute
    .toString()
    .padStart(2, '0')}:00`; // ← 초 단위까지 시간 포맷 맞춰서 저장
};
