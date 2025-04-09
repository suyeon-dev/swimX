import { z } from 'zod';

// 로그인 유효성 검사 스키마 정의
export const signInSchema = z.object({
  email: z.string().email('유효한 이메일을 입력해주세요'),
  password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다'),
});

// zod 스키마 기반 타입 추론
export type SignInFormData = z.infer<typeof signInSchema>;
