import { z } from 'zod';

// [react-hoo-form] SwimFormData 타입 유효성 검사용 zod 스키마
// - zod refine 사용해서 조건부 유효성 검사 추가
export const swimFormSchema = z
  .object({
    date: z.string().min(1, '날짜를 입력해주세요'),
    startTime: z.string().min(1, '시작 시간을 입력해주세요'),
    endTime: z.string().min(1, '종료 시간을 입력해주세요'),
    pool: z.string().optional(),
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
    intensity: z.number().min(0).max(100).default(60),
    distance: z.coerce.number().min(1, '거리를 입력해주세요'),
    heartRateAvg: z.coerce.number().optional(),
    heartRateMax: z.coerce.number().optional(),
    paceMinute: z.coerce.number().optional(),
    paceSeconds: z.coerce.number().optional(),
    calories: z.coerce.number().optional(),
    gear: z.array(z.string()).optional(),
    // 일기 텍스트 에디터
    content: z.string().optional(), // Tiptap HTML
    title: z.string().optional(),
    thumbnailUrl: z.string().optional(), // 대표 이미지 URL
  })
  .refine(
    (data) => {
      // lane이 '기타'인 경우 customLane은 필수
      if (data.lane === '기타') {
        return data.customLane && data.customLane.trim() !== '';
      }
      return true;
    },
    {
      message: '기타 레인 숫자를 입력해주세요',
      path: ['customLane'],
    }
  );

export type SwimFormData = z.infer<typeof swimFormSchema>;
