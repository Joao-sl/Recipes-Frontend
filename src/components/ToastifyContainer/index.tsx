'use client';

import { Bounce, ToastContainer } from 'react-toastify';

export function ToastifyContainer() {
  return (
    <ToastContainer
      position='bottom-right'
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme='light'
      transition={Bounce}
    />
  );
}
