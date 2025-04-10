import { NextResponse } from 'next/server';
import { insertSwimLog } from '@/lib/api/diary/insertSwimLog'; // 기존의 insertSwimLog 함수
import { SwimLog } from '@/types/log';

// 수영일기 생성
export async function POST(req: Request) {
  try {
    const swimLogData: SwimLog = await req.json(); // 클라이언트에서 보낸 데이터를 받음
    const result = await insertSwimLog(swimLogData); // 서버 사이드에서 데이터 처리
    return NextResponse.json(result); // 처리된 결과를 클라이언트로 반환
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET / 수영일기 목록 조회

// DELETE / 수영일기 삭제
