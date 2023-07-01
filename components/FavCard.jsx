"use client"

import getPrice from '@/utils/getPrice'
import platformLogo from '@/utils/platformLogo'
import { useRouter } from 'next/navigation'
import React from 'react'

const FavCard = ({ data, handleRemoveBtn, bagData, handleAddToBagBtn }) => {

    const router = useRouter()

    const bagItemCheck = bagData && bagData.includes(data._id)

    var productPrice = parseInt(getPrice(data.price, data.discount))

    const goToBag = async () => {
        router.push(`/home/bag`)
    }

    const toProductDetails = ()=>{
        router.push(`/home/${data._id}`)
    }

  return (
    <>
    <div className='w-full h-max text-white flex sm:flex-row flex-col justify-start bg-[#3f3f3fa6] relative
      rounded-[12px] overflow-hidden border border-[#ffffff20] hover:border-[#ffffff3e]'>

        <div className='sm:w-[50%] w-full h-max sm:p-4 p-3 relative'>
            <div className=' absolute w-max h-max pl-1 pr-1.5 bg-[#585858c2] backdrop-blur-sm
            rounded-lg text-[16px] flex items-center bottom-1 left-1.5 m-4'>
            <svg className='text-yellow-500 w-[20px] h-[20px]'
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="currentColor" d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"/></svg>
            {data.rating}
            </div>
            <img onClick={toProductDetails} 
            src={data.mainImg} className='w-full aspect-[16/9] h-max 
            rounded-[8px] cursor-pointer'/>
        </div>

        <div className='sm:w-[50%] w-full min-h-full max-h-max sm:py-4 sm:pr-4 sm:pl-1 px-3 pb-2.5 
        flex flex-col justify-between'>

            <div onClick={toProductDetails}>
                <p className='xl:text-[20px] text-[18px] text-ellipsis line-clamp-1 hover:underline 
                font-medium cursor-pointer'>{data.title}</p>
            </div>

            <div className='w-full h-max xl:flex lg:hidden sm:flex hidden space-x-2 ml-1'>
            {data.platform.map((each, i) => {
            return <div key={i} className='w-max h-max' > 
            {platformLogo(each)} </div> })} 
            </div>

            <div className='flex items-center justify-start w-full h-max gap-x-1.5'>
                <p className='text-white w-max h-max xl:text-[14px] text-[12px] px-1.5 py-0.5 
                rounded-md bg-[#585858c2] font-medium'>-{data.discount}%</p>

                <p className='xl:text-[14px] text-[12px] line-through text-gray-400'>
                ₹{data.price.toLocaleString('en-US')}</p>

                <p className='xl:text-[20px] text-[18px] font-medium '>
                ₹{productPrice.toLocaleString('en-US')}</p>
            </div>

            <div className='w-full h-max flex items-center justify-between'>
                <button onClick={()=>handleRemoveBtn(data._id, data.title)}
                className='border border-transparent 
                hover:border-[#ffffff60] rounded-md 
                w-max h-max px-2 py-1 xl:text-[16px] text-[14px]'>
                    Remove
                </button>
                <button onClick={() => (bagItemCheck ? goToBag() : handleAddToBagBtn(data._id, data.title))}
                className='hover:bg-[#8e8e8e99] border border-[#ffffff60]
                rounded-md w-max h-max px-3 py-1 xl:text-[16px] text-[14px]'>
                    {bagItemCheck ? 'GO TO BAG' : 'ADD TO BAG'}
                </button>
            </div>

      </div>
    </div>
    </>
  )
}

export default FavCard