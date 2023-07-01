

import React from 'react'

const HomeLayoutLoading = () => {
  return (
    <div className='w-full h-max min-h-screen bg-[#202020]'>
      <div className='w-full h-max fixed top-0 z-20'>
        <div className='w-full h-[70px] bg-[#2a2a2a] flex justify-between items-center 
        px-5 relative top-0 border-b border-[#ffffff20]'>
        <div className="w-max h-max flex items-center gap-x-7" >
            <div className='w-[130px] h-[35px] rounded-[7px] bg-[#3f3f3f] animate-pulse'
            style={{
            animationDelay: `${1*0.05}s`,
            animationDuration: "1s", }}></div>
            <div className='w-[300px] h-[28px] rounded-[7px] bg-[#3f3f3f] animate-pulse'
            style={{
            animationDelay: `${2*0.05}s`,
            animationDuration: "1s", }}></div>
        </div>
        <div className="w-max h-max flex items-center gap-x-5" >
            <div className='w-[100px] h-[35px] rounded-[7px] bg-[#3f3f3f] animate-pulse'
            style={{
            animationDelay: `${3*0.05}s`,
            animationDuration: "1s", }}></div>
            <div className='w-[45px] h-[45px] rounded-full bg-[#3f3f3f] animate-pulse'
            style={{
            animationDelay: `${4*0.05}s`,
            animationDuration: "1s", }}></div>
            <div className='w-[80px] h-[35px] rounded-[7px] bg-[#3f3f3f] animate-pulse'
            style={{
            animationDelay: `${5*0.05}s`,
            animationDuration: "1s", }}></div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default HomeLayoutLoading