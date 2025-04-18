// 수영 일기

// ------------- 개인 기록 -------------
export interface SwimLog {
  date: string;
  time: { start: number; end: number }; //timestamp
  pool: string;
  lane: number;
  intensity: string;
  // 거리 관련
  distanceMode: 'total' | 'stroke';
  distance?: number; // 총거리 입력값(total) or 계산 결과(stroke)
  strokeInputMode?: 'manual' | 'lap';
  strokeDistances?: Partial<Record<StrokeType, number>>; // 자유형, 접영 등
  // 선택 항목 (건강데이터)
  heartRate?: { avg?: number; max?: number };
  pace?: { minute?: number; seconds?: number };
  calories?: number;
  gear?: string[];
  // 텍스트 에디터 추가
  content?: string; // tiptap HTML
  title?: string; // 요약 제목
  thumbnailUrl?: string | null; // 대표 이미지
}

// ------------- 영법 타입 -------------
export const STROKE_TYPES = [
  'butterfly',
  'backstroke',
  'breaststroke',
  'freestyle',
  'kick',
  'etc',
] as const;

export type StrokeType = (typeof STROKE_TYPES)[number];

// ------------- 운동 강도 -------------
export interface IntensityLevel {
  label: '최하' | '하' | '중' | '상' | '최상'; // 유니언 타입으로 제한
  value: number;
  description: string;
}

export const intensityLevels: IntensityLevel[] = [
  {
    label: '최하',
    value: 20,
    description:
      '거의 힘들지 않음. 편안한 속도로 오래 수영할 수 있음. 몸을 푸는 데 적합.',
  },
  {
    label: '하',
    value: 40,
    description:
      '가볍게 운동이 되는 느낌. 약간 숨이 차지만 대화 가능. 비교적 오래 지속 가능.',
  },
  {
    label: '중',
    value: 60,
    description:
      '운동하는 느낌이 듬. 심박수 상승. 잠깐의 집중이 필요하지만 부담되지 않음.',
  },
  {
    label: '상',
    value: 80,
    description:
      '도전적이며 숨이 차고 팔과 다리에 힘이 듦. 오래 지속하기 어려움.',
  },
  {
    label: '최상',
    value: 100,
    description:
      '최대치에 가까운 강도. 매우 힘들며 짧은 시간만 가능. 훈련 후 회복 시간 필요.',
  },
];
