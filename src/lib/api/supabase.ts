// 프로젝트와 supabase를 연결하기 위한 config 파일
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase'; // 타입 지정

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
