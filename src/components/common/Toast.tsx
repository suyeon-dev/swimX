import { toast } from 'react-toastify';
import { MdCheckCircle, MdCancel, MdInfo } from 'react-icons/md';

export const showToast = {
  success: (msg: string) =>
    toast.success(msg, {
      icon: <MdCheckCircle className='text-green-500 text-2xl' />,
      progressClassName: '!bg-green-600 !h-4 !rounded-md',
    }),
  error: (msg: string) =>
    toast.error(msg, {
      icon: <MdCancel className='text-red-500 text-2xl' />,
      progressClassName: '!bg-red-600 !h-4 !rounded-md',
    }),
  info: (msg: string) =>
    toast.info(msg, {
      icon: <MdInfo className='text-blue-500 text-2xl font-black' />,
      progressClassName: '!bg-blue-600 !h-4 !rounded-md',
    }),
};
