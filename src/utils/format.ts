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
