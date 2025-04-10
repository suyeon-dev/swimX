'use client';

import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <ToastContainer
        position='top-center'
        autoClose={3000} // 3초
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
    </SessionProvider>
  );
}
