"use client"

import React, { useContext, useState } from 'react'
import '../app/globals.css'
import getPrice from '@/utils/getPrice';
import { message } from 'antd';
import { useRouter } from 'next/navigation';
import { Ring } from '@uiball/loaders';
import { CheckoutContext } from '@/context/CheckoutContext';
import { LibraryIconBlocksSmall } from '@/assets/LogoSvgs';

const ProductCard = ({data, userId}) => { 
  const router = useRouter();

  const { setCheckoutData } = useContext(CheckoutContext);

  const [isHovered, setIsHovered] = useState(false);
  const [heartIcon , setHeartIcon] = useState(data.saved.includes(String(userId)))
  const [likeLoading, setLikeLoading] = useState(false);
 
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  var productPrice = parseInt(getPrice(data.price, data.discount))

  const discountAmount = (data.price * data.discount) / 100;

  var forNow = data.mainImg.length > 10 ? data.mainImg : 'https://images5.alphacoders.com/408/408539.jpg'
 
  const toProductDetails = ()=>{
    router.push(`/home/${data._id}`)
  }

  const goToLibrary = () => {
    router.push(`/home/library`)
  }

  const handleFav = async () => {
    if(userId) {
      setLikeLoading(true)
      try {
        const response = await fetch(`/api/favourites/addToFav/${data._id.toString()}`, {
          method: "PATCH",
          body: JSON.stringify({
            userId: userId,
          }),
        });

        if (response.ok) {
          setHeartIcon(!heartIcon)
        }
      } catch (error) {
        console.log(error);
      } finally {
        message.success(!heartIcon?'Added to Favourites':'Removed from Favourites')
        setLikeLoading(false);
      }
    }else {
      router.push(`/auth`)
    }
  }

  const handlePurchase = () => {
    if(userId) {
      const forCheckout = {
        fromCart: false,
        totals: {
          price: data.price,
          discountAmount: discountAmount,
          total: productPrice
        },
        products: {
          mainImg: data.mainImg,
          title: data.title,
          discount: data.discount,
          _id: data._id
        }
      }

      setCheckoutData(forCheckout)
      router.push(`/checkout`)
    }else {
      router.push(`/auth`)
    }
  }
  
  return (
    <>
    <div 
    onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
    style={{backgroundImage: isHovered ? `url(${forNow})` : null}}
    className='totalCardDiv w-full h-max text-white rounded-[12px] 
    overflow-hidden p-3 relative '>

      <div className='coverDiv'></div>

      <div className='w-full h-max relative flex items-center justify-center'>

        <button onClick={handleFav} disabled={likeLoading}
        className='plusBtn w-max h-max absolute top-2 right-2.5 bg-[#525252bf] 
          items-center justify-center rounded-full p-1.5 hidden backdrop-blur-sm'>
          {likeLoading ? 
            <Ring 
            size={21}
            lineWeight={4}
            speed={2} 
            color="white" 
            />
            :
            (!heartIcon ? 
            <svg className='w-[22px] h-[22px]' 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24">
                <path fill="currentColor" 
                d="m10.65 19.8l-1.725-1.575q-2.65-2.425-4.788-4.813T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.325 0 2.5.562t2 1.538q.825-.975 2-1.538t2.5-.562q2.35 0 3.925 1.575T22 8.15q0 2.875-2.125 5.275T15.05 18.25l-1.7 1.55q-.575.55-1.35.55t-1.35-.55Zm.4-13.05q-.725-1.025-1.55-1.563t-2-.537q-1.5 0-2.5 1t-1 2.5q0 1.3.925 2.763t2.213 2.837q1.287 1.375 2.65 2.575T12 18.3q.85-.775 2.213-1.975t2.65-2.575q1.287-1.375 2.212-2.837T20 8.15q0-1.5-1-2.5t-2.5-1q-1.175 0-2 .537T12.95 6.75q-.175.25-.425.375T12 7.25q-.275 0-.525-.125t-.425-.375Zm.95 4.725Z"/>
            </svg>
            :
            <svg className='w-[22px] h-[22px]' 
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill="currentColor" 
                d="M13.35 20.13c-.76.69-1.93.69-2.69-.01l-.11-.1C5.3 15.27 1.87 12.16 2 8.28c.06-1.7.93-3.33 2.34-4.29c2.64-1.8 5.9-.96 7.66 1.1c1.76-2.06 5.02-2.91 7.66-1.1c1.41.96 2.28 2.59 2.34 4.29c.14 3.88-3.3 6.99-8.55 11.76l-.1.09z"></path>
            </svg>
            )
          }
        </button>

        <div className=' absolute w-max h-max pl-1 pr-1.5 bg-[#585858c2] backdrop-blur-sm
          rounded-lg text-[16px] flex items-center bottom-1 left-1.5'>
          <svg className='text-yellow-500 w-[20px] h-[20px]'
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="currentColor" d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"/></svg>
          {data.rating}
        </div>
        <img onClick={toProductDetails}
        src={forNow} className='w-full aspect-[16/9] h-max rounded-[12px] cursor-pointer' />
      </div>

      <div className='relative w-full h-max flex items-center justify-between mt-2 px-1'>
        <div className='w-full h-max flex flex-col items-start justify-center '>
          <p onClick={toProductDetails}
          className='text-[18px] text-ellipsis line-clamp-1 font-medium cursor-pointer'>{data.title}</p>
          
          <div className='flex items-center justify-start w-full h-max gap-x-1.5'>
            <p className='text-white w-max h-max text-[13px] px-1.5 py-0.5 
              rounded-md bg-[#585858c2] font-medium'>-{data.discount}%</p>

              <p className='text-[14px] line-through text-gray-400'>
              ₹{data.price.toLocaleString('en-US')}</p>

            <p className='text-[16px] font-medium '>
              ₹{productPrice.toLocaleString('en-US')}</p>
          </div>
        </div>

        <div className='w-max h-max flex items-center justify-center '>
          {data?.library.includes(String(userId)) ? 
            <button onClick={goToLibrary}
            className='w-max h-max rounded-lg xl:px-3.5 px-4 py-2
            flex items-center justify-center bg-[#505050c0] hover:bg-[#aaaaaa99]'>
              <LibraryIconBlocksSmall />
            </button>
          :
            <button onClick={handlePurchase}
              className='buyBtn w-max h-max rounded-lg xl:px-3.5 px-4 py-2
              flex items-center justify-center bg-[#505050c0]'>
              {/* <svg className='w-[26px] h-[26px]'
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M6.41 6L5 7.41L9.58 12L5 16.59L6.41 18l6-6z"/><path fill="currentColor" d="m13 6l-1.41 1.41L16.17 12l-4.58 4.59L13 18l6-6z"/>
              </svg> */}
              <svg className='w-[24px] h-[22px]' 
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M17 18a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2M1 2h3.27l.94 2H20a1 1 0 0 1 1 1c0 .17-.05.34-.12.5l-3.58 6.47c-.34.61-1 1.03-1.75 1.03H8.1l-.9 1.63l-.03.12a.25.25 0 0 0 .25.25H19v2H7a2 2 0 0 1-2-2c0-.35.09-.68.24-.96l1.36-2.45L3 4H1V2m6 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2m9-7l2.78-5H6.14l2.36 5H16Z"/>
              </svg>
              {/* <svg className='w-[24px] h-[22px]'
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M19 20c0 1.11-.89 2-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2a2 2 0 0 1 2 2M7 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2c1.11 0 2-.89 2-2s-.89-2-2-2m.2-3.37l-.03.12c0 .14.11.25.25.25H19v2H7a2 2 0 0 1-2-2c0-.35.09-.68.24-.96l1.36-2.45L3 4H1V2h3.27l.94 2H20c.55 0 1 .45 1 1c0 .17-.05.34-.12.5l-3.58 6.47c-.34.61-1 1.03-1.75 1.03H8.1l-.9 1.63M8.5 11H10V9H7.56l.94 2M11 9v2h3V9h-3m3-1V6h-3v2h3m3.11 1H15v2h1l1.11-2m1.67-3H15v2h2.67l1.11-2M6.14 6l.94 2H10V6H6.14Z"/>
              </svg> */}
            </button>
          }
          
        </div>
      </div>

    </div>
    </>
  )
}

export default ProductCard