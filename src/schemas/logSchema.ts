import { z } from 'zod';

// [react-hoo-form] SwimFormData 타입 유효성 검사용 zod 스키마
// - zod refine 사용해서 조건부 유효성 검사 추가
export const swimFormSchema = z
  .object({
    date: z.string().min(1, '날짜를 입력해주세요'),
    startTime: z.string().min(1, '시작 시간을 입력해주세요'),
    endTime: z.string().min(1, '종료 시간을 입력해주세요'),
    pool: z.string().optional(),

    // 레인 선택 + 기타 레인 처리
    lane: z.enum(['25', '50', '기타'], {
      required_error: '레인을 선택해주세요',
    }),
    customLane: z
      .string()
      .optional()
      .refine(
        (val) => !val || !isNaN(Number(val)), // 숫자여야 함 (입력된 경우에만 검사)
        {
          message: '숫자를 입력해주세요',
        }
      ),

    // 운동 강도
    intensity: z.number().min(0).max(100).default(60),

    // 거리
    distanceMode: z.enum(['total', 'stroke']), // 입력 방식 (총거리 Or 영법별 거리)
    distance: z.coerce.number().optional(), // 총거리 입력값 or 계산 결과
    strokeInputMode: z.enum(['manual', 'lap']).optional(), // 영법별 거리 입력 방식(수치 or 랩)
    strokeDistances: z
      .record(z.coerce.number().min(0)) // 예: { freestyle: 500, butterfly: 0 }
      .optional(),

    // 선택 항목 (심박수, 페이스, 칼로리, 장비)
    heartRateAvg: z.coerce.number().optional(),
    heartRateMax: z.coerce.number().optional(),
    paceMinute: z.coerce.number().optional(),
    paceSeconds: z.coerce.number().optional(),
    calories: z.coerce.number().optional(),
    gear: z.array(z.string()).optional(),

    // 텍스트 에디터
    content: z.string().optional(), // Tiptap HTML
    title: z.string().optional(),
    thumbnailUrl: z.string().optional(), // 대표 이미지 URL
  })
  // 조건부 유효성 검삿 (lane ='기타'인 경우 customLane은 필수)
  .refine(
    (data) => {
      if (data.lane === '기타') {
        return data.customLane && data.customLane.trim() !== '';
      }
      return true;
    },
    {
      message: '기타 레인 숫자를 입력해주세요',
      path: ['customLane'],
    }
  )

  // 거리 입력 방식에 따른 조건부 유효성 검사
  .superRefine((data, ctx) => {
    if (data.distanceMode === 'total') {
      if (data.distance === undefined || isNaN(data.distance)) {
        ctx.addIssue({
          path: ['distance'],
          code: z.ZodIssueCode.custom,
          message: '총거리를 입력해주세요',
        });
      }
    }

    if (data.distanceMode === 'stroke') {
      if (!data.strokeInputMode) {
        ctx.addIssue({
          path: ['strokeInputMode'],
          code: z.ZodIssueCode.custom,
          message: '영법별 거리 입력 방식을 선택해주세요',
        });
      }

      if (
        !data.strokeDistances ||
        Object.keys(data.strokeDistances).length === 0
      ) {
        ctx.addIssue({
          path: ['strokeDistances'],
          code: z.ZodIssueCode.custom,
          message: '영법별 거리를 1개 이상 입력해주세요',
        });
      }
    }
  });

export type SwimFormData = z.infer<typeof swimFormSchema>;
