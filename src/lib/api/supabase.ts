// 서버용 Supabase
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase'; // Supabase에서 생성된 타입 지정

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

export const serverSupabase = createClient<Database>(
  supabaseUrl,
  serviceRoleKey
);
