"use client"

import OrderSummary from '@/components/OrderSummary';
import '../globals.css'
import { CheckoutContext } from '@/context/CheckoutContext';
import { message } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import Payment from '@/components/Payment/Payment';
import checkCardValues from '@/utils/checkCardValues';
import { useSession } from 'next-auth/react';
import { MultiplySymbol, PayFailed } from '@/assets/LogoSvgs';
import { redirect, useRouter } from 'next/navigation';
import PaymentStatusCard from '@/components/Payment/PaymentStatusCard';

const initialCard = { 
  cardNumber: '',
  cardHolder: '',
  exp_month: '',
  exp_year: '', 
  cvc: '',
  saveCardData: false,
}

const Checkout = () => {

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect(`/home`)
    }
  })

  var userId = session && session.user.id

  const router = useRouter();

  const { checkoutData } = useContext(CheckoutContext);

  const [cardData, setCardData] = useState(initialCard);

  const cardValidation = checkCardValues(cardData)
  const [gotCardData, setGotCardData] = useState(false);

  const [isLoading, setLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState('');

  useEffect(() => {
    if(checkoutData === null) {
      redirect(`/home`)
    }
  }, [checkoutData]);

  useEffect(() => {
    if (cardValidation) {
      setGotCardData(true);
      message.success({
        content: `Card Number Ending ${cardData.cardNumber.slice(-4)} is selected`,
      })
    }else {
      setGotCardData(false);
    }
  }, [cardValidation]);

  const returnHomeBtn = () => {
    // setCheckoutData(null)
    setCardData(initialCard)
    router.push(`/home`)
  }


  if(isLoading) {
    return (
      <div className='bg-[#202020] w-full h-screen text-white 
      fixed top-0 right-0 left-0 bottom-0
      flex flex-col items-center justify-center z-50'>
        
      <div className='w-full h-full flex justify-center items-center'>
        {orderStatus.length === 0 ?
          <div className='w-full h-max flex flex-col justify-center items-center'>
            <p className='text-[35px]'>Loding...</p>
            <p className='text-[30px]'>Plz do not refresh or exit the window...</p>
          </div>
        :
        (orderStatus === 'Payment initialization failed. Please verify the provided card details and try again.' ? 
          <div className='sm:w-[600px] w-full sm:h-max h-full bg-[#2e2e2e] 
          sm:border border-[#ffffff60] sm:rounded-[12px]
          flex flex-col items-center justify-center pt-3 pb-5 px-4 gap-y-5'>
            <div className='w-full h-max flex items-center justify-between text-[20px] font-medium'>
              <p>Error</p>
              <button className='w-max h-max' 
              onClick={() => {
                setLoading(false)
                setCardData(initialCard)
                setOrderStatus('')
              }} >
                <MultiplySymbol className=' text-white ' />
              </button>
            </div> 

            <div className='w-max h-max flex items-center justify-center p-5 rounded-full bg-[#851f1f60]'>
                <PayFailed  className=' text-red-500 '/>
            </div>

            <div className='w-full h-max flex items-center justify-center text-center px-1 text-[18px]'>
              {orderStatus}
            </div>
          </div>
        :
          <PaymentStatusCard orderStatus={orderStatus} totalCost={checkoutData.totals.total}
          returnHomeBtn={returnHomeBtn} />
        )
        }
      </div>
      
      </div> 
    )
  }

 
  return (
    <>
    {checkoutData && 
    <div className='w-full h-max flex lg:flex-row flex-col items-center justify-start'>

      <div className='checkoutProCards lg:w-[65%] w-full lg:h-[calc(100vh_-_70px)] max-h-max h-max 
        flex flex-col items-center overflow-scroll '>
          <Payment userId={userId}
          cardData={cardData}
          setCardData={setCardData}
          gotCardData={gotCardData} />
      </div>

      <div className='w-[0.8px] lg:block hidden
      min-h-[calc(100vh_-_110px)]  bg-[#ffffff60]'></div>


      <div className='checkoutProCards lg:w-[35%] w-full lg:h-[calc(100vh_-_70px)] h-max overflow-scroll
        flex justify-center lg:fixed right-0 top-[70px]'>
        <OrderSummary checkoutData={checkoutData} userId={userId}
        cardData={cardData} gotCardData={gotCardData}
        setLoading={setLoading} setOrderStatus={setOrderStatus} />
      </div>

    </div>
    }
    </>
  )
}

export default Checkout