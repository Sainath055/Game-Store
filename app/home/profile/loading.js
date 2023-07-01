
import React from 'react'

// Profile page
const Loading = () => {
  return (
    <div className='w-full max-h-max min-h-screen
      flex items-center justify-center text-white'>
      <div className='2xl:w-[40%] xl:w-[50%] lg:w-[60%] md:w-[70%] w-[90%] h-max
        flex flex-col items-center justify-center text-white gap-y-4'>

        <div className='w-full h-max flex items-center justify-between'>
          <div className='flex items-center justify-center gap-x-4'>
            <div className='w-[55px] h-[55px] cursor-pointer uppercase
              flex items-center justify-center text-[22px] font-medium
              rounded-full bg-[#3f3f3f] animate-pulse '
              style={{
                animationDelay: `${1 * 0.05}s`,
                animationDuration: "1s", }}>
            </div>
            <div className='w-max flex flex-col justify-center gap-y-2'>
              <p className='w-[85px] h-[28px] bg-[#3f3f3f] animate-pulse rounded-[7px]'
              style={{
                animationDelay: `${2 * 0.05}s`,
                animationDuration: "1s", }}></p>
              <p className='w-[140px] h-[20px] bg-[#3f3f3f] animate-pulse rounded-[7px]'
              style={{
                animationDelay: `${3 * 0.05}s`,
                animationDuration: "1s", }}></p>
            </div>
          </div>
          <div className='w-[130px] h-[32px] bg-[#3f3f3f] animate-pulse rounded-[7px]'
          style={{
            animationDelay: `${4 * 0.05}s`,
            animationDuration: "1s", }}></div>
        </div>

        <div className='sm:w-[80%] w-full h-max flex items-center justify-evenly mb-4 mt-2'>
          {[...Array(3)].map((_,i)=>( 
            <div key={i} className='w-[100px] h-[35px] bg-[#3f3f3f] animate-pulse rounded-[7px]'
            style={{
              animationDelay: `${i * 0.05}s`,
              animationDuration: "1s", }}>
            </div>
          ))}
        </div>

        <div className='w-full h-[330px] overflow-hidden
        flex justify-center'>
          <div className='w-full h-max flex flex-col justify-center gap-y-5 lg:px-10 sm:px-5 px-4'>
          {[...Array(2)].map((_,i)=>( 
            <div key={i} className='w-full h-max flex flex-col gap-y-2'>
              <div className='w-[120px] h-[25px] bg-[#3f3f3f] animate-pulse rounded-[7px]'
              style={{
                animationDelay: `${i * 0.05}s`,
                animationDuration: "1s", }}></div>
              <div className='w-full h-[32px] bg-[#3f3f3f] animate-pulse rounded-[7px]'
              style={{
                animationDelay: `${i * 0.05}s`,
                animationDuration: "1s", }}></div>
            </div>
          ))}
            <div className='w-full h-max flex items-center justify-end mt-2'>
              <div className='w-[75px] h-[34px] bg-[#3f3f3f] rounded-[7px] animate-pulse'
              style={{
                animationDelay: `${1.5 * 0.05}s`,
                animationDuration: "1s", }}></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Loading