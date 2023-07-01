"use client"


import { message } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';


export default function checkoutLayout({ children }) {

  const router = useRouter()

  const handleCancel = () => {
    message.loading('Canceling please wait...')
            .then(() => router.push(`/home`))
  }

  return (
    <section className='bg-[#202020] w-full max-h-max min-h-[calc(100vh_-_70px)]' >

      <div className='w-full h-[70px] bg-[#2a2a2a] text-white fixed top-0 z-20
      flex justify-between items-center px-5 overflow-hidden'>

        <div className='w-max h-full flex items-center justify-center
          border-b-2 border-[#888888] px-2 text-[20px]
          /bg-gradient-to-t from-[#88888810] via-[#2a2a2a00] to-[#2a2a2a00 ] '>
          Checkout
        </div>
        
        <button onClick={handleCancel}
        className='w-max h-max px-2.5 py-1.5 
          border border-[#ffffff60] hover:bg-[#aaaaaa99]
          rounded-lg text-[16px] flex items-center justify-center'>
          Cancel
        </button>
        
      </div>
 
      <div className='w-full h-max mt-[70px]'>
        {children}
      </div>
  
    </section>
  );
}