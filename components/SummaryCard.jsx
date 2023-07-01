"use client"

import { CheckoutContext } from '@/context/CheckoutContext';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'

const SummaryCard = ({extractedSummary}) => {
    const router = useRouter()
 
    const { setCheckoutData } = useContext(CheckoutContext);

    const totals = extractedSummary.reduce(
        (acc, item) => { 
            const discountAmount = (item.price * item.discount) / 100;
            const finalPrice = item.finalPrice
        
            acc.price += item.price;
            acc.discountAmount += discountAmount; 
            acc.total += finalPrice;
        
            return acc;
        },
        { price: 0, discountAmount: 0, total: 0 }
    );
    totals.discount = ((totals.discountAmount / totals.price) * 100).toFixed(2);


    const handleCheckout = () => {
        const forCheckout = {
            fromCart: true,
            totals: totals,
            products: [...extractedSummary]
        }
        setCheckoutData(forCheckout)
        router.push(`/checkout`)
    }


  return (
    <>
    <div className='w-full h-max text-white bg-[#3f3f3fa6] flex flex-col gap-y-5
    border border-[#ffffff20] rounded-[12px] overflow-hidden py-4 px-5 '>

        <div className='w-full h-max flex flex-col gap-y-2 text-[18px]'>
            <div className='w-full h-max flex items-center justify-between'>
                <p>Price</p>
                <p>₹{totals.price.toLocaleString('en-US')}</p>
            </div>

            <div className='w-full h-[0.8px] rounded-full bg-[#ffffff60]'></div>

            <div className='w-full h-max flex items-center justify-between'>
                <p>Discount</p>
                <p className='w-max h-max text-[16px] px-1.5 py-0.5 
                rounded-md bg-[#585858c2]'>
                    -{totals.discount}%
                </p>
            </div>

            <div className='w-full h-[0.8px] rounded-full bg-[#ffffff60]'></div>

            <div className='w-full h-max flex items-center justify-between'>
                <p>You save</p>
                <p>₹{totals.discountAmount.toLocaleString('en-US')}</p>
            </div>
        </div>

        <div className='w-full h-[0.8px] rounded-full bg-[#ffffff60]'></div>

        <div className='w-full h-max flex flex-col gap-y-3 text-[20px]'>
            <div className='w-full h-max flex items-center justify-between'>
                <p>Total</p>
                <p className='font-semibold'>₹{totals.total.toLocaleString('en-US')}</p>
            </div>

            <button onClick={handleCheckout}
                className='lg:buyBtn w-full h-max bg-[#606060d7] px-2 py-2 
                border border-[#ffffff60] hover:bg-[#aaaaaa99]
                rounded-lg text-[16px] flex items-center justify-center'>

                <svg className='w-[22px] h-[20px] mr-1'
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24">
                    <path fill="currentColor" 
                    d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2s-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2s2-.9 2-2s-.9-2-2-2zm2-2c0-.55-.45-1-1-1H7l1.1-2h7.45c.75 0 1.41-.41 1.75-1.03l3.24-6.14a.998.998 0 0 0-.4-1.34a.996.996 0 0 0-1.36.41L15.55 11H8.53L4.54 2.57a.993.993 0 0 0-.9-.57H2c-.55 0-1 .45-1 1s.45 1 1 1h1l3.6 7.59l-1.35 2.44C4.52 15.37 5.48 17 7 17h11c.55 0 1-.45 1-1zM11.29 2.71a.996.996 0 0 1 1.41 0l2.59 2.59c.39.39.39 1.02 0 1.41L12.7 9.3a.996.996 0 1 1-1.41-1.41l.88-.89H9c-.55 0-1-.45-1-1s.45-1 1-1h3.17l-.88-.88a.996.996 0 0 1 0-1.41z">
                    </path>
                </svg>
                CHECKOUT
            </button>
        </div>

    </div>
    </>
  )
}

export default SummaryCard