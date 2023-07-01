"use client"

import { RightArrow } from '@/assets/LogoSvgs';
import getCardLogo from '@/utils/getCardLogo';
import getCardType from '@/utils/getCardType';
import moment from 'moment';
import React from 'react'

const OrderDetails = ({ data, closeViewDetails, scrollToBottom }) => {

    const amountPaid = data?.products.reduce((total, product) => total + product.price, 0);

    function getPaymentStatusDiv(paymentStatus) {
        const isSuccess = paymentStatus === 'Payment successful';
        const statusClass = isSuccess ? 'bg-green-600' : 'bg-red-600';
        
        return (
            <div className={`w-max h-max px-2 py-0.5 rounded-[8px] font-medium text-[16px] ${statusClass}`}>
            {isSuccess ? 'Succeeded' : 'Failed'}
            </div>
        );
    }

    const cardType = getCardType(data?.cardNumber)

    let CardLogo = getCardLogo(cardType)

  return (
    <>
    {data?.length === 0 ? 
        <div>Error Occured</div>
        :
        <div className='orderDetailsDiv w-full h-screen flex flex-col p-4 gap-y-4'>

            <button onClick={closeViewDetails}
            className='sm:hidden bg-[#323232cd] hover:bg-[#515151d7] px-3 py-2 uppercase
            border border-[#ffffff60] rounded-lg text-[16px] flex items-center justify-center gap-x-1'>
                <div className='transform scale-x-[-1]'><RightArrow /></div> Back to Orders 
            </button>

            <div className='w-full h-max uppercase py-2 bg-[#282828cd] px-3 flex text-[18px] 
            min-[500px]:flex-row flex-col rounded-md items-center justify-between'>
                <p className='font-medium'>Id</p>
                <p>{data?._id}</p>
            </div>

            <div className='w-full h-max py-3 bg-[#282828cd] flex flex-col items-center rounded-md gap-y-2 text-[16px]'>
                <div className='w-full h-max flex items-center justify-between uppercase px-4 text-[18px] font-medium'>
                    <p>Payment</p>
                    <div>{getPaymentStatusDiv(data?.paymentStatus)}</div>
                </div>
                <div className='w-full h-[0.8px] bg-gray-400'></div>
                <div className='w-full h-max flex items-center justify-between px-4'>
                    <p>Date</p>
                    <p>{moment(data?.createdAt).format("D-MM-YYYY")}</p>
                </div>
                <div className='w-[96%] h-[0.8px] bg-gray-500'></div>
                <div className='w-full h-max flex items-center justify-between px-4'>
                    <p>Time</p>
                    <p>{moment(data?.createdAt).format("h:mm:ss A")}</p>
                </div>
                <div className='w-[96%] h-[0.8px] bg-gray-500'></div>
                <div className='w-full h-max flex items-center justify-between px-4'>
                    <p>Card Number</p>
                    <p>{data?.cardNumber}</p>
                </div>
                <div className='w-[96%] h-[0.8px] bg-gray-500'></div>
                <div className='w-full h-max flex items-center justify-between px-4'>
                    <p>Card Company</p>
                    <CardLogo />
                </div>
                <div className='w-[96%] h-[0.8px] bg-gray-500'></div>
                {data?.paymentStatus === 'Payment successful' ?
                <div className='w-full h-max flex items-center justify-between px-4 font-medium text-[18px]'>
                    <p>Amount Paid</p>
                    <p>₹{amountPaid}</p>
                </div>
                :
                <div className='w-full h-max flex items-center justify-between px-4'>
                    <p>Error statement</p>
                    <p>{data?.paymentStatus}</p>
                </div>
                }
                
            </div>

            <div className='w-full h-max py-3 bg-[#282828cd] flex flex-col items-center rounded-md gap-y-2 text-[16px]'>
                <div className='w-full h-max flex items-center justify-between uppercase px-4 text-[18px] font-medium'>
                    <p>Products</p>
                    <div className='w-[30px] h-[30px] flex items-center justify-center 
                    bg-[#585858df] rounded-full text-[16px]'>{data?.products.length}</div>
                </div>
                <div className='w-full h-[0.8px] bg-gray-400'></div>
                {data?.products.map((data, i)=>(
                    <div key={i} className='w-full h-max flex flex-col items-center rounded-md gap-y-2 text-[16px]'>
                    <div className='w-full h-max flex items-center justify-between px-4'>
                        <p>{data?.title}</p>
                        <p>₹{data?.price}</p>
                    </div>
                    <div className='w-[96%] h-[0.8px] bg-gray-500'></div>
                    </div>
                ))}
                <div className='w-full h-max flex items-center justify-between px-4 font-medium text-[18px]'>
                    <p>Total</p>
                    <p>₹{amountPaid}</p>
                </div>
            </div>

            <div className='w-full h-max py-3 px-4 bg-[#282828cd] flex items-center justify-between rounded-md'>
                <div className='w-max h-max text-[16px]'>
                    Trouble with your payment?
                </div>
                <button onClick={() => {
                    scrollToBottom();
                    closeViewDetails();
                    }}
                className='b/g-[#606060d7] hover:bg-[#515151d7] px-2 py-1 uppercase 
                    border border-[#ffffff60] rounded-lg text-[16px] flex items-center gap-x-1'>
                    Contact Us
                    <RightArrow />
                </button>
            </div>

        </div>
    }
    </>
  )
}

export default OrderDetails