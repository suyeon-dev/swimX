// 클라이언트용 Supabase

// 프로젝트와 supabase를 연결하기 위한 config 파일
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase'; // Supabase에서 생성된 타입 지정

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// 클라이언트에서 사용하는 Supabase 인스턴스 생성
// - 인스턴스를 통해 .frmo(), .auth 등 사용해 데이터 접근 가능
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
