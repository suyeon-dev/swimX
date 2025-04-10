export async function getSwimLogsByUser(userId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/swim_logs?user_id=eq.${userId}&order=date.desc`,
    {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
      },
      // ISR 적용 가능
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) throw new Error('수영일기 조회 실패');

  const data = await res.json();
  return data;
}
