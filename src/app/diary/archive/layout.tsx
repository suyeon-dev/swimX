import type { ReactNode } from 'react';

export default function ArchiveLayout({ children }: { children: ReactNode }) {
  return (
    <div className='bg-slate-100 min-h-screen'>
      <div className='px-4 pt-6 max-w-5xl mx-auto'>{children}</div>
    </div>
  );
}
