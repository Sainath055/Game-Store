"use client"

import React, { useState } from 'react'
import CheckoutProCard from './CheckoutProCard'
import { loadStripe } from '@stripe/stripe-js';
import { message } from 'antd';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const OrderSummary = ({checkoutData, cardData, gotCardData, setLoading, setOrderStatus, userId}) => {

  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleCheckBox = (event) => {
    setAcceptTerms(event.target.checked)
  }

  const handlePayment = async () => {
    const stripe = await stripePromise;
      
    try {
      // Call the API/payment route to create a payment intent or retrieve the client secret
      const response = await fetch('/api/payment', {
        method: 'POST',
        // Add any necessary body parameters required by your server-side logic
        body: JSON.stringify({ 
          amount: checkoutData.totals.total, 
          cardNumber: cardData.cardNumber,
          exp_month: parseInt(cardData.exp_month, 10),
          exp_year: parseInt(cardData.exp_year), 
          cvc: cardData.cvc,
        }),
      });

      const data = await response.json();
  
      // Retrieve the client secret and card token from the response
      const { clientSecret, token } = data;

      // confirm Card Payment
      const { error } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
              card: {
                token: token.id,
              },
            },
        });
        
      if (error) {
      // Handle the error
      return (error.message);
      } else {
      // Payment succeeded
      return ('Payment successful');
      // You can perform additional actions here, such as updating your UI or displaying a success message to the user
      }
    } catch (error) {
      console.error('Error fetching client secret:', error);
      throw error;
    }
  };

  const saveCardData = async () => {
    try {
      const response = await fetch(`/api/user/cardList/${userId.toString()}`, { 
        method: "POST",
        body: JSON.stringify({
          cardData: { 
            cardNumber: cardData.cardNumber,
            cardHolder: cardData.cardHolder,
            exp_month: cardData.exp_month,
            exp_year: cardData.exp_year, 
          },
        })
      })
      if (response.ok) {
        message.success(`Card saved in your card list`)
        return true
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  const clearCartData = async () => {
    try {
      const response = await fetch(`/api/bag?userId=${JSON.stringify(userId)}`,
      { method: "DELETE", })
      if (response.ok) {
        return true
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  const saveInDB = async (paymentStatus) => {
    let orderProducts;
    if (checkoutData.fromCart) {
      orderProducts = checkoutData.products.map((item) => ({
        price: item.finalPrice,
        _id: item._id,
        title: item.title,
        // mainImg: item.mainImg,
      }));
    } else {
      orderProducts = [{
        price: checkoutData.totals.total,
        _id: checkoutData.products._id,
        title: checkoutData.products.title,
        // mainImg: checkoutData.products.mainImg,
      }];
    }
    try {
      const response = await fetch(`/api/orders/${userId.toString()}`, { 
        method: "POST",
        body: JSON.stringify({
          userId: userId,
          products: orderProducts,
          cardNumber: cardData.cardNumber,
          paymentStatus: paymentStatus,
        }),
      }); 
      if (response.ok) {
        setOrderStatus(paymentStatus)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const placeOrderBtn = async () => {
    if (!gotCardData) {
      message.warning("Card Details required!");
    } else if (!acceptTerms) {
      message.warning("You must accept the terms and conditions.");
    } else {
      try {
        setLoading(true);
        const paymentStatus = await handlePayment();
        if (paymentStatus === 'Payment successful') {
          if (checkoutData.fromCart) {
            await clearCartData();
          }
          if (cardData.saveCardData) {
            await saveCardData();
          }
          await saveInDB(paymentStatus);
        } else {
          await saveInDB(paymentStatus);
        }
      } catch (error) {
        setOrderStatus("Payment initialization failed. Please verify the provided card details and try again.");
      }
    }
  };
  



  return (
    <>
    <div className='checkoutProCards max-w-md  lg:w-[70%] w-[90%] h-full overflow-scroll
            flex flex-col justify-between pt-6'>

        <div className='w-full min-h-[300px] max-h-full flex flex-col gap-y-4 overflow-hidden'>
          <div className='w-full h-max text-white text-[26px] px-1'>
            Order Summary
          </div>

          <div className='checkoutProCards w-full h-full pb-2 pt-0.5 
          flex flex-col gap-y-4 overflow-hidden overflow-y-scroll'>
            {
              checkoutData.fromCart ? 
              (checkoutData.products.map((data,i)=>(
                <div key={i} >
                  <CheckoutProCard data={data} />
                </div>
              ))) 
              :
              <div className='w-full h-max flex flex-col gap-y-2 border border-[#ffffff20]
              bg-[#282828a6] p-2 rounded-[7px] overflow-hidden text-white' >
                <img src={checkoutData.products.mainImg} className='w-full aspect-[16/9] h-max rounded-[8px]' />

                <div className='flex items-center justify-between px-1'>
                  <p className='w-full h-max text-[18px]
                  font-medium text-ellipsis line-clamp-1'>
                    {checkoutData.products.title}
                  </p>
                  <p className='text-white w-max h-max text-[12px] px-1 py-0.5 
                  rounded-md bg-[#585858c2]'>-{checkoutData.products.discount}%</p>
                </div>
                
              </div>
            }
          </div>
        </div>

        <div className='w-full h-max text-white 
            pt-2 pb-6 text-[14px] bg-[#202020]
            flex flex-col gap-y-2 '> 

          <div className='w-full h-max flex items-center justify-between px-1'>
            <div>Price</div>
            <div>₹{checkoutData.totals.price.toLocaleString('en-US')}</div>
          </div>

          <div className='w-full h-max flex items-center justify-between px-1'>
            <div className='flex gap-x-1'>
              Discount
              {checkoutData.fromCart && 
              <p className='text-white w-max h-max text-[12px] px-1 py-0.5 
              rounded-md bg-[#585858c2]'>-{checkoutData.totals.discount}%</p>}
            </div>
            <div>-₹{checkoutData.totals.discountAmount.toLocaleString('en-US')}</div>
          </div>

          <div className='w-full h-[0.8px] my-[2%] bg-[#ffffff60]'></div>

          <div className='w-full h-max flex items-center justify-between px-1 text-[18px] font-medium'>
            <div>Total</div>
            <div>₹{checkoutData.totals.total.toLocaleString('en-US')}</div>
          </div>

          <div className='w-full h-max flex flex-col gap-y-3'>
            <div className='w-full h-max flex items-center justify-start px-1'>
              <label className="checkBoxLabel flex items-center">
                <input onChange={handleCheckBox} type="checkbox" />
                <svg className='w-[18px] h-[18px] mr-2'
                  viewBox="0 0 64 64" >
                  <path d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16" pathLength="575.0541381835938" 
                  className="path"></path>
                </svg><p className='text-[14px]'>I accept the terms and conditions.</p>
              </label>
              
            </div>
            
            <button onClick={placeOrderBtn}
                className={'w-full h-max bg-[#606060d7] px-2 py-2 '+ 
                ' border border-[#ffffff60] rounded-lg text-[18px] flex items-center justify-center '+
                (gotCardData ? 
                ' opacity-100 buyBtn hover:bg-[#aaaaaa99] ' : 
                ' opacity-50 hover:cursor-not-allowed')}>
              PLACE ORDER
            </button>
          </div>
     
        </div>
      
    </div>
    </>
  )
}

export default OrderSummary