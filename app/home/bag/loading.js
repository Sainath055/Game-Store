

import React from 'react'

// bag page
const Loading = () => {
  return (
    <div className='w-full h-max flex lg:flex-row flex-col lg:items-start items-center justify-center gap-x-6'>
      <div className='lg:w-[60%] sm:w-[80%] w-[90%] h-max flex flex-col gap-y-4'>
        <div className='w-full h-[40px] rounded-[7px] bg-[#3f3f3f] animate-pulse mt-6'
        style={{
            animationDelay: `${1.5 * 0.05}s`,
            animationDuration: "1s", }}></div>
        {[...Array(3)].map((_,i)=>(
          <div key={i} className='w-full h-max flex justify-start bg-[#323232a6] relative
          rounded-[12px] overflow-hidden' style={{
            animationDelay: `${i * 0.05}s`,
            animationDuration: "1s",
          }}>
            <div className='w-[38%] h-max p-4 relative'>
              <div className='w-full aspect-[16/9] h-max rounded-[12px] bg-[#3f3f3f] animate-pulse 
              outline-none border-none' 
              style={{
                animationDelay: `${0.05}s`,
                animationDuration: "1s", }}></div>
            </div>
            <div className='w-[62%] min-h-full max-h-max py-4 pr-4 pl-3 xl:flex hidden flex-col justify-between'>
                {[...Array(4)].map((_,i)=>(
                    <div key={i} className='w-full h-[30px] rounded-[7px] bg-[#3f3f3f] animate-pulse'
                    style={{
                        animationDelay: `${i * 0.05}s`,
                        animationDuration: "1s", }}>
                    </div>
                ))}
            </div>
            <div className='w-[62%] min-h-full max-h-max py-4 pr-4 pl-3 sm:flex xl:hidden hidden flex-col justify-between'>
                {[...Array(3)].map((_,i)=>(
                    <div key={i} className='w-full h-[25px] rounded-[7px] bg-[#3f3f3f] animate-pulse'style={{
                        animationDelay: `${i * 0.05}s`,
                        animationDuration: "1s", }}>
                    </div>
                ))}
            </div>
            <div className='w-[62%] min-h-full max-h-max py-4 pr-4 pl-3 flex sm:hidden flex-col justify-between'>
                {[...Array(2)].map((_,i)=>(
                    <div key={i} className='w-full h-[21px] rounded-[7px] bg-[#3f3f3f] animate-pulse'style={{
                        animationDelay: `${i * 0.05}s`,
                        animationDuration: "1s", }}>
                    </div>
                ))}
            </div>
          </div>
        ))}
      </div>
      <div className='lg:w-[26%] sm:w-[80%] w-[90%] h-max flex flex-col gap-y-4 sticky top-[70px]'>
          <div className='w-full h-[40px] rounded-[7px] bg-[#3f3f3f] animate-pulse mt-6'
           style={{
            animationDelay: `${1.5 * 0.05}s`,
            animationDuration: "1s", }}></div>
          <div className='w-full h-max bg-[#323232a6] flex flex-col gap-y-6
          rounded-[12px] overflow-hidden py-4 px-5 '>
            <div className='w-full h-max flex gap-y-2 flex-col'>
                {[...Array(3)].map((_,i)=>(
                    <div key={i} className='w-full h-[30px] rounded-[7px] bg-[#3f3f3f] animate-pulse'
                    style={{
                        animationDelay: `${i * 0.05}s`,
                        animationDuration: "1s", }}
                    >
                    </div>
                ))}
            </div>
            <div className='w-full h-max flex gap-y-2 flex-col'>
              <div className='w-full h-[30px] rounded-[7px] bg-[#3f3f3f] animate-pulse'
              style={{
                animationDelay: `${1 * 0.05}s`,
                animationDuration: "1s", }} ></div>
              <div className='w-full h-[50px] rounded-[7px] bg-[#3f3f3f] animate-pulse'
              style={{
                animationDelay: `${2 * 0.05}s`,
                animationDuration: "1s", }}></div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Loading