'use client';

import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <ToastContainer
        position='top-center'
        autoClose={2000} // 2초
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme='dark'
        style={{ top: '8rem' }}
      />
    </SessionProvider>
  );
}
