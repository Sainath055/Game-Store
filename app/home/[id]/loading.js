
import React from 'react'

// [id] Product details page
const Loading = () => {
  return (
    <div className='w-full h-max flex 
    min-[900px]:flex-row flex-col min-[900px]:justify-center 
    min-[900px]:items-start items-center'>

      <div className='min-[900px]:max-w-[65%] w-full h-max 2xl:pl-[65px] 
        min-[900px]:pl-[40px] min-[900px]:pr-[15px] pt-6 min-[900px]:pb-10 pl-6 pr-6'>  
        <div className='w-full aspect-[16/9] h-max rounded-[12px] bg-[#3f3f3f] animate-pulse 
          outline-none border-none' 
          style={{
            animationDelay: `${1*0.05}s`,
            animationDuration: "1s", }}>
        </div>
        <div className='w-full h-max flex overflow-hidden pt-5'>
          <div className='w-max h-max flex gap-x-3'>
            {[...Array(7)].map((_,i)=>(
              <div key={i} className='w-[150px] h-max aspect-[16/9] rounded-[7px] bg-[#3f3f3f] animate-pulse'
              style={{
                animationDelay: `${i*0.05}s`,
                animationDuration: "1s", }}></div>
            ))}
          </div>
        </div>
        <div className='w-full h-max min-[900px]:flex hidden flex-col text-white text-[18px] pt-5 gap-y-2'>
          {[...Array(4)].map((_,i)=>(
            <div key={i} className='w-full h-[16px] rounded-[6px] bg-[#3f3f3f] animate-pulse'
            style={{
              animationDelay: `${i*0.05}s`,
              animationDuration: "1s", }}>
            </div>
          ))}
        </div>
      </div>

      <div className='xl:sticky xl:top-[70px] xl:right-0 min-[900px]:min-w-[35%] min-[900px]:max-w-[35%] w-full h-max 
        flex 2xl:flex-row flex-col 2xl:justify-start gap-x-6 
        2xl:pr-[65px] min-[900px]:pr-[40px] min-[900px]:pl-[15px] 
        min-[900px]:pt-6 min-[900px]:pb-10 pl-6 pr-6 '>

        <div className='w-full min-[900px]:max-w-[400px] h-max min-[900px]:bg-[#323232a6] 
        text-white rounded-[12px] py-4 min-[900px]:px-5 px-2'>
          <div className='w-full h-[45px] rounded-[6px] bg-[#3f3f3f] animate-pulse'></div>
          <div className='w-full h-[30px] rounded-[6px] bg-[#3f3f3f] animate-pulse mt-2.5'></div>
          <div className='w-full h-max min-[900px]:hidden flex flex-col text-white text-[18px] pt-5 gap-y-2'>
            {[...Array(4)].map((_,i)=>(
              <div key={i} className='w-full h-[16px] rounded-[6px] bg-[#3f3f3f] animate-pulse'
              style={{
                animationDelay: `${i*0.05}s`,
                animationDuration: "1s", }}>
              </div>
            ))}
          </div>
          <div className='w-full h-max flex flex-col gap-y-2 mt-5'>
            {[...Array(3)].map((_,i)=>(
              <div key={i} className='w-full h-[25px] rounded-[6px] bg-[#3f3f3f] animate-pulse'
              style={{
                animationDelay: `${i*0.05}s`,
                animationDuration: "1s", }}>
              </div>
            ))}
          </div>
          <div className='w-full h-[30px] rounded-[6px] bg-[#3f3f3f] animate-pulse mt-5'
            style={{
              animationDelay: `${0.05}s`,
              animationDuration: "1s", }}>
          </div>
          <div className='w-full h-max flex min-[900px]:flex-col 
          flex-row min-[900px]:gap-y-2.5 gap-x-2.5 mt-3'>
            {[...Array(2)].map((_,i)=>(
              <div key={i} className='w-full h-[42px] rounded-[6px] bg-[#3f3f3f] animate-pulse'
              style={{
                animationDelay: `${i*0.05}s`,
                animationDuration: "1s", }}>
              </div>
            ))}
          </div>
        </div>

        <div className='2xl:w-max w-full h-max 2xl:p-0 p-4
        flex flex-row 2xl:flex-col 2xl:gap-y-4 gap-x-4 items-center justify-evenly'>
          {[...Array(3)].map((_,i)=>(
            <div key={i} className='w-[50px] h-[50px] rounded-full bg-[#3f3f3f] animate-pulse'
            style={{
              animationDelay: `${i*0.05}s`,
              animationDuration: "1s", }}>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Loading