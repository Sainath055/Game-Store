"use client"

import React, { useContext, useState } from 'react'
import '../app/globals.css'
import platformLogo from '@/utils/platformLogo'
import getPrice from '@/utils/getPrice'
import { message } from 'antd'
import { useRouter } from 'next/navigation'
import { Ring } from '@uiball/loaders'
import { BagContext } from '@/context/BagContext'
import { CheckoutContext } from '@/context/CheckoutContext'
import { LibraryIconBlocks, LibraryIconBlocksSmall } from '@/assets/LogoSvgs'

const DetailsSection = ({userId, id, mainImg, description,
  title, year, rating ,genre, platform, price, discount, library}) => {

  const router = useRouter();

  const { setCheckoutData } = useContext(CheckoutContext);

  const { setBagData, bagData } = useContext(BagContext);
  const bagItemCheck = bagData && bagData.includes(id)

  const [bagStatus , setBagStatus] = useState(bagItemCheck)
  const [BagLoading, setBagLoading] = useState(false);

  var productPrice = parseInt(getPrice(price, discount))

  const discountAmount = (price * discount) / 100;
 
  // var genre_options = ['Action', 'Adventure', 'Puzzle', 'Crime', 
  // 'Fantasy', 'Sci-Fi', 'Drama', 'Horror', 'Mystery' ]

  const handleBagBtn = async () => {
    if(userId) {

      if(bagStatus) {
        router.push(`/home/bag`)
      } else {
        setBagLoading(true)
        try {
          const response = await fetch(`/api/bag/${userId.toString()}`, {
              method: "PATCH",
              body: JSON.stringify({
              productId: id,
              }),
          }); 
          if (response.ok) {
            setBagData([...bagData, id])
          }
        } catch (error) {
            console.log(error);
        } finally {
          setBagStatus(true)
          setBagLoading(false)
          message.success(`${title} is successfully added to Bag`)
        }
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
          price: price,
          discountAmount: discountAmount,
          total: productPrice
        },
        products: {
          mainImg: mainImg,
          title: title,
          discount: discount,
          _id: id
        }
      }
  
      setCheckoutData(forCheckout)
      router.push(`/checkout`)
    } else {
      router.push(`/auth`)
    }
  }

  const goToLibrary = () => {
    router.push(`/home/library`)
  }

  const goToGenre = (val) => {
    router.push(`/home/search?g=${val}`)
  }

  const goToPlatform = (val) => {
    router.push(`/home/search?pt=${val}`)
  }

  
  return (
    <>
    <div className='w-full min-[900px]:max-w-[400px] h-max text-white overflow-hidden flex flex-col relative pb-1'>

      {/* <div className='w-[40px] h-[40px] absolute bg-[#606060d7] top-0 right-0
      rounded-full flex items-center justify-center' >
        <HeartOutlined className='text-[18px]' />
      </div> */}

      <p className='w-full h-max text-[27px] '>{title}</p>

      <div className='w-full h-max flex flex-wrap gap-2 mt-2.5'>
        {genre.map((each, i) => {
        return <div key={i} onClick={()=>goToGenre(each)}
        className='bg-[#515151a6] w-max h-max whitespace-nowrap	
        text-[14px] rounded-lg text-gray-200 cursor-pointer
        px-2.5 py-0.5'> {each} </div> })} 
      </div>

      <div className='w-full h-max min-[900px]:hidden flex flex-col text-white text-[18px] pt-5'>
          {description}
      </div>

      <div className='w-full h-max flex flex-col gap-y-1 mt-5'>

        <div className='w-full h-max flex items-center justify-between'>
          <p className='text-[18px] text-gray-300'>Rating</p>
          <div className='flex items-center text-[18px]'>
            <svg className='text-yellow-500 w-[22px] h-[22px]'
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="currentColor" d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"/>
            </svg>
            {rating}
          </div>
        </div>

        <div className='w-full h-[0.8px] rounded-full bg-[#ffffff60]'></div>

        {/* <div className='w-full h-max flex items-center justify-between'>
          <p className='text-[18px] text-gray-300 cursor-pointer hover:underline'>Reviews</p>
          <p className='text-[18px]'>Add Reviews in DB</p>
        </div> */}

        {/* <div className='w-full h-[0.8px] rounded-full bg-[#ffffff60]'></div> */}

        <div className='w-full h-max flex items-center justify-between'>
          <p className='text-[18px] text-gray-300'>Year</p>
          <p className='text-[18px]'>{year}</p>
        </div>

        <div className='w-full h-[0.8px] rounded-full bg-[#ffffff60]'></div>

        <div className='w-full h-max flex items-center justify-between'>
          <p className='text-[18px] text-gray-300'>Platfom</p>
          <div className='w-max h-max flex space-x-2'>
            {platform.map((each, i) => {
            return <div key={i} onClick={()=>goToPlatform(each)}
            className='w-max h-max cursor-pointer' > 
            {platformLogo(each)} </div> })} 
          </div>
        </div>

        <div className='w-full h-[0.8px] rounded-full bg-[#ffffff60]'></div>
      </div>

      <div className='w-full h-max flex items-center gap-x-1 mt-5'>
        <p className='text-[24px] font-medium w-max h-max'>
        ₹{productPrice.toLocaleString('en-US')}</p>
        
        <div className='text-[14px] text-gray-400 flex gap-x-1 w-max h-max'>
        M.R.P:
        <p className='line-through'>₹{price.toLocaleString('en-US')}</p>
        </div>
        <p className='text-white w-max h-max text-[14px] px-1.5 py-0.5 
        rounded-md bg-[#585858c2] font-normal'>-{discount}%</p>
      </div>

      {library?.includes(String(userId)) ? 
      <div className='w-full h-max flex flex-col gap-y-2.5 mt-3'>
        <button onClick={goToLibrary}
          className='w-full h-max bg-[#606060d7] px-2 py-2 
          border border-[#ffffff60] hover:bg-[#aaaaaa99]
          rounded-lg text-[16px] flex items-center justify-center'>
          <div className='w-max h-max mr-1'>
            <LibraryIconBlocksSmall />
          </div>
          LIBRARY
        </button>
      </div>
      :
      <div className='w-full h-max flex min-[900px]:flex-col flex-row-reverse min-[900px]:gap-y-2.5 gap-x-2.5 mt-3'>
        <button onClick={handlePurchase}
          className='buyBtn w-full h-max bg-[#606060d7] px-2 py-2 
          border border-[#ffffff60] hover:bg-[#aaaaaa99]
          rounded-lg text-[16px] flex items-center justify-center'>
          {/* <svg className='w-[22px] h-[20px] mr-1'
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M19 20c0 1.11-.89 2-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2a2 2 0 0 1 2 2M7 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2c1.11 0 2-.89 2-2s-.89-2-2-2m.2-3.37l-.03.12c0 .14.11.25.25.25H19v2H7a2 2 0 0 1-2-2c0-.35.09-.68.24-.96l1.36-2.45L3 4H1V2h3.27l.94 2H20c.55 0 1 .45 1 1c0 .17-.05.34-.12.5l-3.58 6.47c-.34.61-1 1.03-1.75 1.03H8.1l-.9 1.63M8.5 11H10V9H7.56l.94 2M11 9v2h3V9h-3m3-1V6h-3v2h3m3.11 1H15v2h1l1.11-2m1.67-3H15v2h2.67l1.11-2M6.14 6l.94 2H10V6H6.14Z"/>
          </svg> */}
          <svg className='w-[22px] h-[20px] mr-1' 
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M17 18a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2M1 2h3.27l.94 2H20a1 1 0 0 1 1 1c0 .17-.05.34-.12.5l-3.58 6.47c-.34.61-1 1.03-1.75 1.03H8.1l-.9 1.63l-.03.12a.25.25 0 0 0 .25.25H19v2H7a2 2 0 0 1-2-2c0-.35.09-.68.24-.96l1.36-2.45L3 4H1V2m6 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2m9-7l2.78-5H6.14l2.36 5H16Z"/>
          </svg>
          PURCHASE
        </button>

        <button onClick={handleBagBtn}
          className='w-full h-max px-2 py-2 
          border border-[#ffffff60] hover:bg-[#aaaaaa99]
          rounded-lg text-[16px] flex items-center justify-center'>
          {BagLoading ?
            <div className='flex items-center justify-center gap-x-1'>
              <Ring
              size={20}
              lineWeight={5}
              speed={2} 
              color="white" 
              />
              ADDING...
            </div>
            :
            (!bagStatus ?
              <>
                <svg className='w-[22px] h-[20px] mr-1'
                xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0a.375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0a.375.375 0 0 1 .75 0Z"/>
                </svg>
                ADD TO BAG
              </>
              :
              <>
                <svg className='w-[24px] h-[22px] mr-1'
                xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M176.49 95.51a12 12 0 0 1 0 17l-56 56a12 12 0 0 1-17 0l-24-24a12 12 0 1 1 17-17L112 143l47.51-47.52a12 12 0 0 1 16.98.03ZM236 128A108 108 0 1 1 128 20a108.12 108.12 0 0 1 108 108Zm-24 0a84 84 0 1 0-84 84a84.09 84.09 0 0 0 84-84Z"></path>
                </svg>
                GO TO BAG
              </>
            )
          }
        </button>
      </div>
      }

    </div>
    </>
  )
}

export default DetailsSection