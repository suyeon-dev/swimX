// -------- 소수점 한 자리까지 반올림하는 함수 --------
// 수영 거리 기반 계산(바퀴 수)
export const toOneDecimal = (num: number): number => {
  return parseFloat(num.toFixed(1));
};
