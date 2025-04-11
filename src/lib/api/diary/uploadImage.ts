/**
 * Supabase Storage에 이미지를 업로드하고 public URL을 반환하는 함수 (REST 방식)
 */
export async function uploadImage(file: File): Promise<string | null> {
  // 1. base URL과 anon key
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  // 2. 파일명과 저장 경로 구성
  const fileExt = file.name.split('.').pop(); // 확장자 추출 (예: png)
  const fileName = `${Date.now()}.${fileExt}`; // 충돌 방지를 위해 timestamp 기반 이름
  const filePath = `diary/${fileName}`; // 저장 경로: images/diary/안에 저장됨

  // 3. Storage REST API로 업로드 요청 보내기
  const uploadRes = await fetch(
    `${supabaseUrl}/storage/v1/object/images/${filePath}`, // 업로드 경로
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${supabaseKey}`, // 클라이언트 인증 헤더 (public 버킷이라도 필요함)
        'Content-Type': file.type, // 파일 MIME 타입 (브라우저가 파일 전송 시 반드시 포함)
        'x-upsert': 'true', // 같은 이름이 있어도 덮어쓰기 허용
      },
      body: file, // 파일 자체를 body에 담아 전송
    }
  );

  // 4. 업로드 실패 시 처리
  if (!uploadRes.ok) {
    console.error('업로드 실패:', await uploadRes.text());
    return null;
  }

  // 5. public URL 생성 (REST 방식은 직접 구성해야 함)
  const publicUrl = `${supabaseUrl}/storage/v1/object/public/images/${filePath}`;
  return publicUrl;
}
