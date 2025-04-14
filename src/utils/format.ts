import { SwimFormData } from '@/schemas/logSchema';
import { SwimLog } from '@/types/log';
import { addDays, differenceInMinutes, parse } from 'date-fns';
// ------------ 총 수영시간 ------------
// (!) hh:mm:ss 형식의 문자열을 Date 객체로 변환
function parseTime(time: string): Date {
  return parse(time, 'HH:mm:ss', new Date(0));
}

// 총 수영 시간을 x분 형식의 문자열로 반환
export const getDurationFormat = (
  startTime: string,
  endTime: string
): string => {
  // 시작/종료 시간의 문자열을 date 객체로 변환
  const start = parseTime(startTime);
  let end = parseTime(endTime);

  // 종료 시간이 시작 시간보다 빠르면 자정을 넘긴 것으로 간주 -> 하루 더함
  if (end < start) {
    end = addDays(end, 1);
  }

  // 두 시간의 차이를 분 단위로 계산
  const totalMinutes = differenceInMinutes(end, start);

  // x분 형식으로 반환
  return `${totalMinutes} min`;
};

// ------------ SwimFormData -> SwimLog 구조 변환 함수 ------------
export const toSwimLog = (data: SwimFormData): SwimLog => {
  const lane =
    data.lane === '기타' && data.customLane
      ? Number(data.customLane)
      : Number(data.lane);

  return {
    date: data.date,
    time: {
      start: timeStringToNumber(data.startTime),
      end: timeStringToNumber(data.endTime),
    },
    pool: data.pool ?? '',
    lane,
    intensity: intensityToText(data.intensity),
    distance: data.distance,
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
