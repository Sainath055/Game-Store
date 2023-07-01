
import React from 'react'
// Search page


const Loading = () => {
  return (
    <div className='w-full h-full flex flex-col justify-center'>
        <div className='w-full h-max flex flex-col
        gap-y-4 py-4 border-b-[0.8px] border-zinc-500'>
            <div className='w-full h-max flex items-center justify-center'>
                <div className='xl:w-[60%] lg:w-[65%] sm:w-[70%] animate-pulse
                w-[60%] h-[42px] rounded-[7px] bg-[#3f3f3f]'
                style={{
                    animationDelay: `${4*0.05}s`,
                    animationDuration: "1s",  }}></div>
            </div>
            <div className='w-full h-max lg:flex hidden items-center justify-center gap-x-4 2xl:px-14 lg:px-10 '>
                {[...Array(4)].map((_,i)=>(
                    <div key={i} className='w-full h-[40px] rounded-[7px] bg-[#3f3f3f] animate-pulse'
                    style={{
                        animationDelay: `${i * 0.05}s`,
                        animationDuration: "1s", }}
                    >
                    </div>
                ))}
            </div>
        </div>
        <div className="w-full h-max bg-[#202020] justify-center
        grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-6 gap-4 
        2xl:px-[120px] lg:px-12 md:px-8 sm:px-5 px-8 py-5" >
          {[...Array(6)].map((_,i)=>(
            <div key={i} className='w-full h-max flex flex-col gap-y-2 
              border border-[#ffffff20] p-3 rounded-[12px] animate-pulse' 
              style={{
                animationDelay: `${i * 0.05}s`,
                animationDuration: "1s", }} >
              <div className='w-full aspect-[16/9] h-max rounded-[12px] bg-[#3f3f3f] outline-none border-none'></div>
              <div className='w-full h-max flex items-center justify-between px-1 gap-x-3'>
                <div className='w-[80%] h-max flex flex-col gap-y-2'>
                    {[...Array(2)].map((_,i)=>(
                        <div key={i} className='w-full h-[16px] rounded-[6px] bg-[#3f3f3f]'>
                        </div>
                    ))}
                </div>
                <p className='w-[20%] h-[40px] rounded-[6px] bg-[#3f3f3f]'></p>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default Loading