"use client"


import { DownloadIcon, PayFailed, PaySuccess } from '@/assets/LogoSvgs'
import { message } from 'antd';
import React, { useState, useEffect } from 'react';

const PaymentStatusCard = ({ orderStatus, returnHomeBtn, totalCost }) => {

    let status = orderStatus === 'Payment successful'

    const [progress, setProgress] = useState(0);

    const duration = 10; // Duration in seconds
    const intervalTiming = 100; // Interval timing in milliseconds

    const increment = 100 / (duration * 1000 / intervalTiming);

    useEffect(() => {
        if(!status) {
            let progress = 0;
            const timer = setInterval(() => {
                progress += increment;
                setProgress(Math.min(progress, 100));

                if (progress >= 100) {
                clearInterval(timer);
                returnHomeBtn()
                }
            }, intervalTiming);

            return () => {
                clearInterval(timer);
            };
        }
    }, [status]);


    
  return (
    <>
    <div className='sm:w-[600px] w-full sm:h-max h-full bg-[#2e2e2e] 
        sm:border border-[#ffffff60] sm:rounded-[12px]
        flex flex-col items-center justify-center pt-3 pb-5 px-4 gap-y-5'>
        <div className='w-full h-max flex items-center justify-center text-[20px] font-medium'>
            <p>{status ? 'Payment Successful' : 'Payment Failed' }</p>
        </div> 

        <div className={'w-max h-max flex items-center justify-center p-5 rounded-full '+ 
        ( status ? ' bg-[#1f853260] ' : ' bg-[#851f1f60] ')}>
            {status ? <PaySuccess className=' text-green-500 ' /> : <PayFailed  className=' text-red-500 '/>}
        </div>

        {!status && 
        <div className='w-full h-max flex items-center justify-center px-1 text-[18px]'>
        {orderStatus}
        </div> }

        {!status && 
        <div className='w-full h-max flex items-center justify-center px-1 text-[18px]'>
            <div className=' w-max h-max px-3 py-1 border border-[#ffffff60] 
            rounded-lg text-[18px] relative overflow-hidden text-transparent'>
                Redirecting to Home
                <button onClick={returnHomeBtn}
                className='absolute top-0 left-0 z-20 w-max h-max px-3 py-1  
                rounded-lg text-[18px] text-white'>
                    Redirecting to Home
                </button>
                <div style={{ width: `${progress}%`, }}  
                className=' h-full bg-[#606060d7] absolute top-0 left-0 z-10 duration-100 ease-in' >
                </div>
            </div>
        </div> }

        {status && 
        <div className='w-full h-max flex items-center sm:justify-between justify-center px-1 text-[18px]'>
            <p className='sm:block hidden'>Amount Paid</p>
            <p className='sm:block hidden'>₹{totalCost.toLocaleString('en-US')}</p>
            <p className='block sm:hidden text-[20px] font-medium'>
                INR {totalCost.toLocaleString('en-US')}</p>
        </div> }
        
        {status && 
        <div className='w-full h-max flex sm:flex-row flex-col items-center 
        justify-between sm:px-1 text-[18px] sm:gap-y-0 gap-y-4'>
        <button className='w-max h-max bg-[#60606000] px-3 py-1 
            border border-[#ffffff60] rounded-lg text-[18px] flex items-center gap-x-1'>
            <DownloadIcon />
            Get Reciept
        </button>
        <button onClick={returnHomeBtn}
            className='w-max h-max bg-[#606060d7] hover:bg-[#787878d7] px-3 py-1 
            border border-[#ffffff60] rounded-lg text-[18px] flex items-center gap-x-1'>
            Return Home
            <svg xmlns="http://www.w3.org/2000/svg" 
            width="18" height="18"
            viewBox="0 0 24 24"><path fill="currentColor" 
            d="M7.15 21.1q-.375-.375-.375-.888t.375-.887L14.475 12l-7.35-7.35q-.35-.35-.35-.875t.375-.9q.375-.375.888-.375t.887.375l8.4 8.425q.15.15.213.325T17.6 12q0 .2-.063.375t-.212.325L8.9 21.125q-.35.35-.863.35T7.15 21.1Z"></path>
            </svg>
        </button>
        </div> }

    </div>
    </>
  )
}

export default PaymentStatusCard