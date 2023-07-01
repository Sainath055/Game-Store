"use client"

import React from 'react'
import '../app/globals.css'

const CheckoutProCard = ({data}) => {

  return (
    <>
    <div className='w-full h-max flex justify-between border border-[#ffffff20]
        bg-[#282828a6] p-2 rounded-[8px] overflow-hidden'>

        <div className='w-[34%] h-max'>
        <img src={data.mainImg} className='w-full aspect-[16/9] h-max rounded-[8px]' />
        </div>
        
        <div className='w-[62%] min-h-full max-h-max flex flex-col items-start justify-between 
            text-white overflow-hidden pb-1'>
            <p className='w-full h-max text-[16px] font-medium 
                text-ellipsis line-clamp-1'>
                {data.title}
            </p>
            <div className='flex items-center justify-start w-full h-max gap-x-1.5'>
                <p className='text-white w-max h-max text-[12px] px-1 py-0.5 
                rounded-md bg-[#585858c2]'>-{data.discount}%</p>

                <p className='text-[14px] line-through text-gray-400'>
                ₹{data.price.toLocaleString('en-US')}</p>

                <p className='text-[16px] font-medium '>
                ₹{data.finalPrice.toLocaleString('en-US')}</p>
            </div>
        </div>

    </div>
    </>
  )
}

export default CheckoutProCard