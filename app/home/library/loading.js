
import React from 'react'

// Library page
const Loading = () => {
  return (
    <div className='w-full h-max flex flex-col items-center gap-y-4 pt-8'>
      <div className='2xl:w-[87%] xl:w-[90%] lg:w-[92%] w-[85%] h-max px-1'>
          <div className='w-[200px] lg:h-[45px] sm:h-[40px] h-[30px] bg-[#3f3f3f] rounded-[7px] animate-pulse'
          style={{
            animationDelay: `${6 * 0.05}s`,
            animationDuration: "1s", }}></div>
      </div>
      <div className='2xl:w-[87%] xl:w-[90%] lg:w-[92%] w-[85%] h-max pb-8 
            grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4'>
        {[...Array(6)].map((_,i)=>(
          <div key={i} className='w-full h-max flex flex-col gap-y-2 duration-75 ease-linear
          border border-[#ffffff20] p-3 rounded-[12px]' >
            <div className='w-full aspect-[16/9] h-max rounded-[12px] bg-[#3f3f3f] animate-pulse 
              outline-none border-none' 
              style={{
                animationDelay: `${i *0.05}s`,
                animationDuration: "1s", }}>
            </div>
            <div className='w-full h-max flex items-center justify-between px-1 gap-x-2'>
              <div className='w-full h-[25px] rounded-[7px] bg-[#3f3f3f] animate-pulse'
              style={{
                animationDelay: `${i *0.05}s`,
                animationDuration: "1s", }}></div>
              <div className='w-[50px] h-[41px] rounded-[7px] bg-[#3f3f3f] animate-pulse'
              style={{
                animationDelay: `${i *0.05}s`,
                animationDuration: "1s", }}></div>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default Loading