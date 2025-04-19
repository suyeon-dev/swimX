'use client';

import { toast } from 'react-toastify';
import { MdCheckCircle, MdCancel, MdInfo } from 'react-icons/md';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const TOAST_ID = 'global-toast';

export const showToast = {
  success: (msg: string) =>
    toast.success(msg, {
      toastId: TOAST_ID,
      icon: <MdCheckCircle className='text-green-500 text-2xl' />,
      progressClassName: '!bg-green-600 !h-4 !rounded-md',
    }),
  error: (msg: string) =>
    toast.error(msg, {
      toastId: TOAST_ID,
      icon: <MdCancel className='text-red-500 text-2xl' />,
      progressClassName: '!bg-red-600 !h-4 !rounded-md',
    }),
  info: (msg: string) =>
    toast.info(msg, {
      toastId: TOAST_ID,
      icon: <MdInfo className='text-blue-500 text-2xl font-black' />,
      progressClassName: '!bg-blue-600 !h-4 !rounded-md',
    }),
};

export function ToastMessageHandler() {
  const searchParams = useSearchParams();
  const message = searchParams.get('message');

  useEffect(() => {
    if (message) {
      showToast.info(message);
    }
  }, [message]);

  return null;
}
