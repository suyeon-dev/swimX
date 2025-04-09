// next-auth 타입 확장(module augmentation)

import 'next-auth'; //타입만 Import (필수)

declare module 'next-auth' {
  // Session.user : 클라이언트에서 접근하는 사용자 정보
  interface Session {
    user: {
      id: string; // 사용자 정의 필드 추가
      login_type?: 'email' | 'google' | 'kakao' | 'naver';
      // 라이브러리 안에 이미 정의된 타입도 나열
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  // User : 백엔드에서 직접 사용하는 사용자 모델 (ex: DB 저장, callback에서 사용)
  interface User {
    id: string;
    login_type?: 'email' | 'google' | 'kakao' | 'naver';
    password?: string | null; //credentials 로그인 시 필요
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}
