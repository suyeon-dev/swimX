import { serverSupabase } from '@/lib/supabase/server';
import { supabase } from '@/lib/supabase/client';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

// 회원가입 API
export async function POST(req: NextRequest) {
  const { email, password, nickname } = await req.json();

  // 이메일 중복 체크
  const { data: existingUser } = await serverSupabase
    .from('users')
    .select('id')
    .eq('email', email)
    .single();

  if (existingUser) {
    return NextResponse.json(
      { error: '이미 가입된 이메일 계정입니다.' },
      { status: 400 }
    );
  }

  // 비밀번호 해시
  const hashedPassword = await bcrypt.hash(password, 10);

  // Supabase에 사용자 정보 삽입
  const { error } = await supabase.from('users').insert([
    {
      email,
      password: hashedPassword,
      nickname,
      login_type: 'email',
      role: 'user',
    },
  ]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(
    { message: '회원가입 완료되었습니다! 🥳' },
    { status: 201 }
  );
}
