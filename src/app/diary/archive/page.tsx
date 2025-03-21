import Link from 'next/link';
import React from 'react';

export default function ArchivePage() {
  return (
    <div>
      <h1 className='text-xl'>아카이브</h1>
      <button>
        <Link href='/diary/write'>작성</Link>
      </button>
    </div>
  );
}
