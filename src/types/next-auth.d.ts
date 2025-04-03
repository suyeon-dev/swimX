// next-auth 타입 확장(module augmentation)

import 'next-auth'; //타입만 Import (필수)

declare module 'next-auth' {
  interface Session {
    user: {
      id: string; //추가
      // 라이브러리 안에 이미 정의된 타입
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}
