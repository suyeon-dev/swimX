import Link from 'next/link';

export default function DiaryPage() {
  return (
    <>
      <h1 className='text-xl'>캘린더</h1>
      <button>
        <Link href='/diary/write'>작성</Link>
      </button>
    </>
  );
}
