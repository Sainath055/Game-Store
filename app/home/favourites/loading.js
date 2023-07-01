
import React from 'react'
// Favourites page
const Loading = () => {
  return (
    <div className='w-full h-max flex flex-col items-center gap-y-4 pt-8'>
      <div className='2xl:w-[87%] xl:w-[90%] lg:w-[92%] w-[85%] h-max px-1'>
          <div className='w-[200px] lg:h-[45px] sm:h-[40px] h-[30px] bg-[#3f3f3f] rounded-[7px] animate-pulse'
          style={{
            animationDelay: `${6 * 0.05}s`,
            animationDuration: "1s", }}></div>
      </div>
      <div className='2xl:w-[87%] xl:w-[90%] lg:w-[92%] w-[85%] h-max pb-8 grid lg:grid-cols-2 grid-cols-1 gap-4'>
        {[...Array(6)].map((_,i)=>(
          <div key={i} className='w-full h-max flex sm:flex-row flex-col justify-start
            rounded-[12px] overflow-hidden bg-[#323232a6]'>
            <div className='sm:w-[50%] w-full h-max sm:p-4 p-3 relative'>
              <div className='w-full aspect-[16/9] h-max rounded-[12px] bg-[#3f3f3f] animate-pulse 
                outline-none border-none' 
                style={{
                  animationDelay: `${0.05}s`,
                  animationDuration: "1s", }}>
              </div>
            </div>

            <div className='sm:w-[50%] w-full min-h-full max-h-max sm:py-4 sm:pr-4 sm:pl-1 px-3 pb-2.5 
            xl:flex lg:hidden sm:flex hidden flex-col justify-between'>
              {[...Array(4)].map((_,i)=>(
                  <div key={i} className='w-full h-[25px] rounded-[7px] bg-[#3f3f3f] animate-pulse'
                  style={{
                      animationDelay: `${i * 0.05}s`,
                      animationDuration: "1s", }}>
                  </div>
              ))}
            </div>
            <div className='sm:w-[50%] w-full min-h-full max-h-max sm:py-4 sm:pr-4 sm:pl-1 px-3 pb-2.5 
            lg:flex xl:hidden hidden flex-col justify-between'>
              {[...Array(3)].map((_,i)=>(
                  <div key={i} className='w-full h-[25px] rounded-[7px] bg-[#3f3f3f] animate-pulse'style={{
                      animationDelay: `${i * 0.05}s`,
                      animationDuration: "1s", }}>
                  </div>
              ))}
            </div>
            <div className='sm:w-[50%] w-full min-h-full max-h-max sm:py-4 sm:pr-4 sm:pl-1 px-3 pb-2.5 
            flex sm:hidden flex-col justify-between gap-y-2'>
              <div className='w-full h-[40px] rounded-[7px] bg-[#3f3f3f] animate-pulse'style={{
                  animationDelay: `${1 * 0.05}s`,
                  animationDuration: "1s", }}>
              </div>
              <div className='w-full h-[25px] rounded-[7px] bg-[#3f3f3f] animate-pulse'style={{
                  animationDelay: `${2 * 0.05}s`,
                  animationDuration: "1s", }}>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default Loading