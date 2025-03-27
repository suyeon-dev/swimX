import { z } from 'zod';

// 유효성 검사용 zod 스키마
export const swimFormSchema = z.object({
  date: z.string().min(1, '날짜를 입력해주세요'),
  startTime: z.string().min(1, '시작 시간을 입력해주세요'),
  endTime: z.string().min(1, '종료 시간을 입력해주세요'),
  pool: z.string().optional(),
  lane: z.enum(['25', '50'], { required_error: '레인을 선택해주세요' }),
  intensity: z.number().min(0).max(100).default(50),
  distance: z.coerce.number().min(1, '거리를 입력해주세요'),
  heartRateAvg: z.coerce.number().optional(),
  heartRateMax: z.coerce.number().optional(),
  paceMinute: z.coerce.number().optional(),
  paceSeconds: z.coerce.number().optional(),
  calories: z.coerce.number().optional(),
  gear: z.array(z.string()).optional(),
});

export type SwimFormData = z.infer<typeof swimFormSchema>;
