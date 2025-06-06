'use client';

import { Flip, ToastContainer } from 'react-toastify';

export function ToastifyContainer() {
  return (
    <ToastContainer
      position='top-center'
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme='light'
      transition={Flip}
    />
  );
}
