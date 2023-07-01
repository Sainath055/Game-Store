"use client"

import React from 'react'
import { signOut } from "next-auth/react"
import { MenuSymbol, MultiplySymbol_30 } from '@/assets/LogoSvgs'
import '../../app/globals.css'
import Link from 'next/link'
import { message } from 'antd'

const Nav_Admin = ({ setOpenMenuDiv, openMenuDiv, userName }) => {

  const handleMenuDiv = () => {
    setOpenMenuDiv((prev)=> (
      !prev
    ))
  }

  const handleSignOut = () => {
    message.loading('Signing out..', 2.5)
      .then(() => signOut())
      .then(() => message.success(`Successfully signed out`))
  }


  return (
    <>
    <div className='w-full h-[70px] bg-blue-600 text-white
      flex items-center justify-between xl:px-5 md:px-4 px-2 shadow-md'>

      <div className='w-max h-max flex items-center justify-center gap-x-3'>
        <button onClick={handleMenuDiv} 
        className='min-w-[32px] min-h-[32px] lg:hidden flex items-center justify-center'>
          {openMenuDiv ? <MultiplySymbol_30 /> : <MenuSymbol />}
        </button>
        <Link href={`/admin`} >
          <div className='w-max h-max flex items-center justify-center gap-x-1'>
              <svg xmlns="http://www.w3.org/2000/svg" 
              width="30px" height="30px" 
              viewBox="0 0 24 24"><path fill="currentColor" 
              d="M12 7.65ZM16.35 12Zm-8.7 0ZM12 16.35Zm-.7-6.55l-2-2q-.15-.15-.225-.337T9 7.075V3q0-.425.288-.713T10 2h4q.425 0 .713.288T15 3v4.075q0 .2-.075.388T14.7 7.8l-2 2q-.3.3-.7.3t-.7-.3Zm5.625 5.2q-.2 0-.388-.075T16.2 14.7l-2-2q-.3-.3-.3-.7t.3-.7l2-2q.15-.15.338-.225T16.925 9H21q.425 0 .713.288T22 10v4q0 .425-.288.713T21 15h-4.075ZM3 15q-.425 0-.713-.288T2 14v-4q0-.425.288-.713T3 9h4.075q.2 0 .388.075T7.8 9.3l2 2q.3.3.3.7t-.3.7l-2 2q-.15.15-.337.225T7.075 15H3Zm7 7q-.425 0-.713-.288T9 21v-4.075q0-.2.075-.388T9.3 16.2l2-2q.3-.3.7-.3t.7.3l2 2q.15.15.225.338t.075.387V21q0 .425-.288.713T14 22h-4Zm2-14.35l1-1V4h-2v2.65l1 1ZM4 13h2.65l1-1l-1-1H4v2Zm7 7h2v-2.65l-1-1l-1 1V20Zm6.35-7H20v-2h-2.65l-1 1l1 1Z">
              </path></svg>
              <p className='lg:block hidden text-[18px]'>GameStore</p>
          </div>
        </Link>
      </div>
      
      <p className='text-[18px]'>Admin Pannel</p>

      <button className='w-max h-max px-2.5 py-1 border-2 text-[16px] rounded-lg'
        onClick={handleSignOut}>
        Log-Out
      </button>
    </div>
    </>
  )
}

export default Nav_Admin