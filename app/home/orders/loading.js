
import React from 'react'

// Orders page
const Loading = () => {
  return (
    <div className='w-full h-max flex flex-col items-center gap-y-4 pt-8'>
      <div className='2xl:w-[87%] xl:w-[90%] lg:w-[92%] w-[85%] h-max px-1'>
          <div className='w-full h-[45px] bg-[#3f3f3f] rounded-[7px] animate-pulse'
          style={{
            animationDelay: `${6 * 0.05}s`,
            animationDuration: "1s", }}></div>
      </div>
      <div className='2xl:w-[87%] xl:w-[90%] lg:w-[92%] w-[85%] h-max pb-8 flex flex-col gap-y-4'>
        <div className='w-full h-[67px] bg-[#3f3f3f] rounded-[7px] animate-pulse'
        style={{
          animationDelay: `${5 * 0.05}s`,
          animationDuration: "1s", }}></div>
        {[...Array(5)].map((_,i)=>(
          <div key={i} className='w-full h-[64px] bg-[#3f3f3f] rounded-[7px] animate-pulse'
          style={{
            animationDelay: `${i * 0.05}s`,
            animationDuration: "1s", }}></div>
        ))}
      </div>
    </div>
  )
}

export default Loading