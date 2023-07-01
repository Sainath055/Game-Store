"use client"

import React, { useContext, useState } from 'react' 
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { BagContext } from '@/context/BagContext';
import { Badge, Dropdown, message } from 'antd';
import '../app/globals.css'
import {  usePathname, useRouter } from 'next/navigation';
import { LibraryIconBlocks } from '@/assets/LogoSvgs';

const Nav = ({ userId, userName }) => {

    const pathname = usePathname();
    const router = useRouter()

    const { bagData } = useContext(BagContext);

    const [searchVal, setSearchVal] = useState("");
    const [isLoading, setLoading] = useState(true);
    const [viewMore, setViewMore] = useState(false);
    const [openSugg, setOpenSugg] = useState(false);
    const [suggItems, setSuggItems] = useState([]);

    const onClick = ({ key }) => {
        if (key === 'sign_out') {
            message.loading('Signing out..')
            .then(() => signOut())
            .then(() => message.success(`Successfully signed out`))
        }
    }

    const items = [
        {
          label: <Link href={`/home/profile`} >Profile</Link>,
          key: 'profile',
        },
        {
          label: <Link href={`/home/orders`} >Orders</Link>,
          key: 'orders',
        },
        {
          label: <Link href={`/home/favourites`} >Favourites</Link>,
          key: 'favourites',
        },
        {
          label: 'Sign-Out',
          key: 'sign_out',
        },
    ]

    const searchInput = async (e) => {
        const { value } = e.target;
        const regex = /^[a-zA-Z0-9\s]*$/;
    
        if (regex.test(value)) {
            setSearchVal(value);
        }
        // setSearchVal(e.target.value)
        try {
            setLoading(true)
            setViewMore(false)
            const response = await fetch(`/api/search/sugg?suggQuery=${JSON.stringify(e.target.value) || 'none'}`, 
            { method: "GET", }); 
            const data = await response.json();
              if (response.ok) {
                if(data.length > 4) {
                    const onlyFour = data.slice(0, 4);
                    setSuggItems(onlyFour)
                    setViewMore(true)
                }else {
                   setSuggItems(data) 
                }
                setLoading(false)
              }
          } catch (error) {
            console.log(error);
          }
    };

    const searchKeyDown = (e) => {
        if (e.keyCode === 13) {
            toSearchPage()
        }
    };

    const toSearchPage = () => {
        console.log(searchVal)
        if(searchVal.length > 0) {
            router.push(`/home/search?q=${searchVal}`)
        } else {
            router.push(`/home/search`)
        }
        setSearchVal('')
        setSuggItems([])
    }

    const toProductDetails = (id)=>{
        router.push(`/home/${id}`)
        setSearchVal('')
        setSuggItems([])
    }

    const handleBlur = () => {
        setOpenSugg(false)
    };

  return (
    <>
    <nav className="w-full h-[70px] bg-[#2a2a2a] text-white
    flex justify-between items-center px-5 relative top-0 border-b border-[#ffffff20]">
        <div className="w-max h-max flex items-center lg:gap-x-8 gap-x-4" >
            <Link href={`/home`} >
                <div className='w-max h-max flex items-center justify-center gap-x-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" 
                    width="30px" height="30px" 
                    viewBox="0 0 24 24"><path fill="currentColor" 
                    d="M12 7.65ZM16.35 12Zm-8.7 0ZM12 16.35Zm-.7-6.55l-2-2q-.15-.15-.225-.337T9 7.075V3q0-.425.288-.713T10 2h4q.425 0 .713.288T15 3v4.075q0 .2-.075.388T14.7 7.8l-2 2q-.3.3-.7.3t-.7-.3Zm5.625 5.2q-.2 0-.388-.075T16.2 14.7l-2-2q-.3-.3-.3-.7t.3-.7l2-2q.15-.15.338-.225T16.925 9H21q.425 0 .713.288T22 10v4q0 .425-.288.713T21 15h-4.075ZM3 15q-.425 0-.713-.288T2 14v-4q0-.425.288-.713T3 9h4.075q.2 0 .388.075T7.8 9.3l2 2q.3.3.3.7t-.3.7l-2 2q-.15.15-.337.225T7.075 15H3Zm7 7q-.425 0-.713-.288T9 21v-4.075q0-.2.075-.388T9.3 16.2l2-2q.3-.3.7-.3t.7.3l2 2q.15.15.225.338t.075.387V21q0 .425-.288.713T14 22h-4Zm2-14.35l1-1V4h-2v2.65l1 1ZM4 13h2.65l1-1l-1-1H4v2Zm7 7h2v-2.65l-1-1l-1 1V20Zm6.35-7H20v-2h-2.65l-1 1l1 1Z">
                    </path></svg>
                    <p className='lg:block hidden'>GameStore</p>
                </div>
            </Link>

            <div className={'w-full h-max flex-col justify-center relative hidden '+
                (pathname === '/home/search' ? ' sm:hidden ' : ' sm:flex ')}>
                <div className='w-max h-max absolute left-2.5'>
                    <svg xmlns="http://www.w3.org/2000/svg" 
                    width="18px" height="18px" 
                    viewBox="0 0 256 256"><path fill="currentColor" 
                    d="m228.24 219.76l-51.38-51.38a86.15 86.15 0 1 0-8.48 8.48l51.38 51.38a6 6 0 0 0 8.48-8.48ZM38 112a74 74 0 1 1 74 74a74.09 74.09 0 0 1-74-74Z">
                    </path></svg>
                </div>
                <button onClick={()=>setSearchVal('')}
                className={'absolute w-max h-max right-2.5 text-[#e9e6e6] '+ 
                (searchVal.length > 0 ? ' flex ' : ' hidden ')}>
                <svg xmlns="http://www.w3.org/2000/svg" 
                width="14px" height="14px" 
                viewBox="0 0 16 16"><path fill="currentColor" fillRule="evenodd" 
                d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16ZM4.22 4.22a.75.75 0 0 1 1.06 0L8 6.94l2.72-2.72a.75.75 0 1 1 1.06 1.06L9.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L8 9.06l-2.72 2.72a.75.75 0 0 1-1.06-1.06L6.94 8L4.22 5.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd">
                </path></svg>
                </button>
                <input onChange={searchInput} autoComplete="off" 
                onKeyDown={searchKeyDown}
                value={searchVal}
                onFocus={()=>setOpenSugg(true)}
                // onBlur={handleBlur}
                type='text' name="search" 
                placeholder='Search'
                className='w-[300px] h-max bg-[#202020] text-white box-border
                hover:border-[#ffffff84] focus:border-[#ffffff84] 
                border border-[#ffffff60] tracking-[1px] pl-8 pr-8 rounded-[8px]
                focus:outline-none text-[14px] leading-7 placeholder:text-[#989898]'/>

                <div
                className={'w-[500px] h-max absolute top-[45px] left-0 bg-[#202020] rounded-lg ' +
                ' items-center box-border shadow-md shadow-[#2a2a2a] ' +
                (searchVal.length > 0 && suggItems.length > 0 && openSugg ? ' flex ' : ' hidden ')}>
                {isLoading ? 
                    <div className='w-full h-max p-4 flex flex-col items-start gap-y-2'>
                        {[...Array(4)].map((_ , i) => (
                            <div key={i} className='w-full h-[55px] flex items-center gap-x-2 p-1 animate-pulse'>
                                <div className='w-[80px] h-[45px] bg-[#3f3f3f] rounded-[6px]'></div>
                                <div className='w-full h-[26px] bg-[#3f3f3f] rounded-[6px]'></div>
                            </div>
                        ))}
                    </div>
                    :
                    <div className='w-full h-max flex flex-col items-start gap-y-2 p-4'>
                        {suggItems.map((data, i)=> (
                            <div key={i} className='w-full h-max flex items-center gap-x-2 p-1'>
                                <img onClick={()=> toProductDetails(data._id)} 
                                src={data.mainImg} 
                                className='w-[80px] aspect-[16/9] h-max rounded-[6px] cursor-pointer' />
                                <p onClick={()=> toProductDetails(data._id)}  
                                className='hover:underline cursor-pointer text-ellipsis line-clamp-1'>
                                    {data.title}
                                </p>
                            </div>
                        ))}
                        <div className={'w-max h-max '+ (viewMore ? ' flex ' : ' hidden ')}>
                            <button onClick={toSearchPage}
                            className='text-[16px] px-1.5 hover:underline'>View more</button>
                        </div>
                    </div>
                }
                </div>
            </div>

            <Link href={`/home/search`} className={'w-max h-max p-0.5 cursor-pointer ' +
            (pathname === '/home/search' ? ' hidden ' : ' sm:hidden flex ')}>
                <svg xmlns="http://www.w3.org/2000/svg" 
                width="20px" height="20px" 
                viewBox="0 0 256 256"><path fill="currentColor" 
                d="m228.24 219.76l-51.38-51.38a86.15 86.15 0 1 0-8.48 8.48l51.38 51.38a6 6 0 0 0 8.48-8.48ZM38 112a74 74 0 1 1 74 74a74.09 74.09 0 0 1-74-74Z">
                </path></svg>
            </Link>

        </div>

        {/* <div className='w-full h-max absolute top-[70px] left-0 bg-[#2a2a2a] px-5 py-4 
        flex items-center justify-center'>
            Filters
        </div> */}

        <div>
            {userId ? (
                <div className="w-max h-full flex items-center justify-center lg:gap-x-5 gap-x-4">
                    <Link href={`/home/library`} >
                        <div className= {'w-max h-[70px] flex items-center justify-center px-2 ' +
                        ' gap-x-1 text-[18px] border-b-2 duration-75 ease-linear '+
                        (pathname === '/home/library' ? ' border-[#888888] ' : 
                        ' hover:border-[#888888] border-transparent ')}>
                          <LibraryIconBlocks /> <p className='lg:block hidden'>Library</p> 
                        </div >
                    </Link>

                    <Dropdown
                    menu={{
                    items,
                    onClick,
                    }} 
                    placement="bottom"
                    // arrow={{
                    //     pointAtCenter: true,
                    // }} 
                    overlayStyle={{ position: 'fixed' }}
                    >
                        <div className='w-[45px] h-[45px] cursor-pointer uppercase
                        flex items-center justify-center text-[20px] font-medium
                        rounded-full bg-[#505050] '>
                            {userName.charAt(0)}
                        </div>
                    </Dropdown>

                    <Link href={`/home/bag`} >
                        <div className= {'w-max h-[70px] flex items-center justify-center px-2 ' +
                        ' gap-x-1 text-[18px] border-b-2 duration-75 ease-linear '+
                        (pathname === '/home/bag' ? ' border-[#888888] ' : 
                        ' hover:border-[#888888] border-transparent ')}>
                           <p className='lg:block hidden'>Bag</p>
                        <Badge count={bagData && bagData.length} size='small' overflowCount={10} >
                            <svg className='text-white'
                            xmlns="http://www.w3.org/2000/svg" width="24" height="22" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0a.375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0a.375.375 0 0 1 .75 0Z"/>
                            </svg>
                        </Badge>
                        </div >
                    </Link>
                </div>
            ) : (
                <>
                <Link href="/auth">
                    <button className='w-max h-max px-3 py-1 border-2 border-white rounded-lg'>
                        Sign-in
                    </button>
                </Link>
                {userName && 
                    <button onClick={() => signOut()}
                    className='w-max h-max px-3 py-1 border-2 border-white rounded-lg'>
                        Sign-OUT
                    </button>
                }
                </>
            )}
        </div>
    </nav>
    </>
  )
}

export default Nav