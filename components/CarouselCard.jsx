"use client"

import React, { useContext, useState } from 'react'
import '../app/globals.css'
import getPrice from '@/utils/getPrice';
import platformLogo from '@/utils/platformLogo';
import { useRouter } from 'next/navigation';
import { Ring } from '@uiball/loaders';
import { message } from 'antd';
import { CheckoutContext } from '@/context/CheckoutContext';
import { LibraryIconBlocksSmall } from '@/assets/LogoSvgs';

const CarouselCard = ({data, userId}) => {
  const router = useRouter();

  const { setCheckoutData } = useContext(CheckoutContext);

  const [heartIcon , setHeartIcon] = useState(data.saved.includes(String(userId)))
  const [likeLoading, setLikeLoading] = useState(false);
    
  //bg-[#3f3f3fa6]
  var genre_options = ['Action', 'Adventure', 'Puzzle', 'Crime', 
  'Fantasy', 'Sci-Fi', 'Drama', 'Horror', 'Mystery' ]
  
  var productPrice = parseInt(getPrice(data.price, data.discount))

  const discountAmount = (data.price * data.discount) / 100;
 
  const toProductDetails = ()=>{
    router.push(`/home/${data._id}`)
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
    <div className='w-full h-max overflow-hidden text-white
        flex justify-between px-1'>

        <div className='w-[68%] relative'>
            <div className=' absolute w-max h-max pl-1 pr-1.5 bg-[#585858c2] backdrop-blur-sm
                rounded-lg text-[16px] flex items-center bottom-2 left-2.5'>
                <svg className='text-yellow-500 w-[20px] h-[20px]'
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill="currentColor" d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"/>
                </svg>
                {data.rating}
            </div>
            <img onClick={toProductDetails}
            src={data.mainImg} className='w-full aspect-[16/9] h-max rounded-[12px] cursor-pointer' />
        </div>

        <div className='w-[30%] min-h-full max-h-max bg-[#3f3f3fa6] py-4 px-5 
            border border-[#ffffff20] rounded-[12px] flex flex-col justify-between'>
            <div>
                <p onClick={toProductDetails}
                className='text-[21px] text-ellipsis line-clamp-1 font-medium cursor-pointer'>{data.title}</p>
                {/* <p className='text-[14px]'>{data.year}</p> */}
                <div className='genreList w-full h-min flex gap-x-2 mt-1 '>
                    {data.genre.map((each, i) => {
                    return <div key={i}  onClick={()=>goToGenre(each)}
                    className='bg-[#515151a6] w-max h-[23px] cursor-pointer
                    text-[12px] rounded-lg flex items-center justify-center
                    px-2 py-0.5'> {each} </div> })} 
                </div>  
                <p className='text-[14px] text-ellipsis mt-1.5
                lg:line-clamp-4 line-clamp-3'>
                    {data.description}
                </p>
            </div>
            <div className='w-full h-max overflow-hidden flex '>
                {/* <p className='w-max h-max text-[16px] mr-2'>Platform:</p> */}
                {data.platform.map((each, i) => {
                return <div key={i}  onClick={()=>goToPlatform(each)} 
                className='mr-3 w-max h-max cursor-pointer' > 
                {platformLogo(each)} </div> })} 
            </div>

            <div className='w-full h-max 2xl:flex xl:hidden min-[1100px]:flex hidden
                items-center justify-start'>
                <a target='blank' href={`https://www.youtube.com/watch?v=${data.videoLinkKey}`}
                className='hover:bg-[#aaaaaa99] border border-[#ffffff60] text-white hover:text-white
                rounded-lg px-3 py-1 text-[16px] flex items-center justify-center gap-x-2'>
                    Watch Trailer
                    <svg className='w-[14px] h-[14px]'
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112v320c0 44.2 35.8 80 80 80h320c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v112c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16h112c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"/>
                    </svg>
                </a>
            </div>

            <div className='flex flex-col items-start justify-center w-full h-max gap-y-1'>
                <div className='flex items-center'>
                    <p className='text-[18px] font-medium mr-2'>
                    ₹{productPrice.toLocaleString('en-US')}</p>
                    <p className='text-white w-max h-max text-[12px] px-1.5 py-0.5 
                    rounded-md bg-[#585858c2] font-normal'>-{data.discount}%</p>
                </div>
                <div className='text-[12px] text-gray-400 flex gap-x-1'>
                M.R.P:
                <p className='line-through'>₹{data.price.toLocaleString('en-US')}</p>
                </div>
            </div>

            {data?.library.includes(String(userId)) ?
              <div className='w-full h-max flex items-center justify-between'>
                <button onClick={goToLibrary}
                  className='w-full h-max bg-[#606060d7] px-2 py-2 
                  border border-[#ffffff60] hover:bg-[#aaaaaa99]
                  rounded-lg text-[16px] flex items-center justify-center'>
                  <LibraryIconBlocksSmall />Library
                </button>
              </div>
              :
              <div className='w-full h-max flex items-center justify-between'>
                <button onClick={handlePurchase}
                  className='buyBtn lg:w-[80%] w-[77%] h-max bg-[#606060d7] px-2 py-2 
                    border border-[#ffffff60] hover:bg-[#aaaaaa99]
                    rounded-lg text-[16px] flex items-center justify-center'>
                    <svg className='w-[22px] h-[20px] mr-1'
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M17 18a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2M1 2h3.27l.94 2H20a1 1 0 0 1 1 1c0 .17-.05.34-.12.5l-3.58 6.47c-.34.61-1 1.03-1.75 1.03H8.1l-.9 1.63l-.03.12a.25.25 0 0 0 .25.25H19v2H7a2 2 0 0 1-2-2c0-.35.09-.68.24-.96l1.36-2.45L3 4H1V2m6 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2m9-7l2.78-5H6.14l2.36 5H16Z"/>
                    </svg>
                    Purchase
                </button>
                <button onClick={handleFav} disabled={likeLoading}
                    className='lg:w-[17%] w-[20%] h-full hover:bg-[#aaaaaa99] border border-[#ffffff60]
                    rounded-lg flex items-center justify-center'>
                    {likeLoading ? 
                    <Ring 
                    size={20}
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
              </div>
            }
        </div>
    </div>
    </>
  )
}

export default CarouselCard