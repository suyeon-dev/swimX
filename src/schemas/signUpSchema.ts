import { z } from 'zod';

// 회원가입 유효성 검사 스키마 정의 (zod)
export const signUpSchema = z
  .object({
    email: z.string().email('유효한 이메일을 입력해주세요'),
    nickname: z.string().min(2, '닉네임은 2자 이상 입력해주세요'),
    password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'], //confirmPassword 필드에 오류 표시
  });

// zod 스키마 기반 타입 추론
export type SignUpFormData = z.infer<typeof signUpSchema>;
