"use client"

import { message } from 'antd';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'

const Username = ({ id, userName, email, setUserData, update }) => {

    const [nameInput, setNameInput] = useState(userName);

    function isButtonDisabled(inputValue) {
        const trimmedValue = inputValue.trim(); // Remove leading and trailing spaces
        return trimmedValue === userName || trimmedValue === '';
    }

    const buttonDisabled = isButtonDisabled(nameInput);

    const handleUpdateNameBtn = async () => {
        try {
            const response = await fetch(`/api/user/username/${id.toString()}`, { 
                method: "PATCH",
                body: JSON.stringify({
                    userName: nameInput.trim(),
                })
            }); 
            const data = await response.json();
                if (response.ok) {
                    message.success(`${data}`)
                    setUserData((prevUserData) => ({
                    ...prevUserData,
                    name: nameInput.trim()
                    }));

                    update({ name: nameInput.trim() })
                }
        } catch (error) {
            console.log(error);
        } 
    }


  return (
    <>
    <div className='w-full h-max flex flex-col justify-center gap-y-3 lg:px-10 sm:px-5 px-4'>

        <div className='w-full h-max flex flex-col'>
            <label htmlFor='email' 
            className='flex text-[16px] text-gray-100 mb-1 pl-1' >
                Email
            </label>
            <input type='text' 
            name='email'
            disabled={true} 
            value={email}
            className='w-full h-max bg-[#323232aa] text-[#c0c0c0] box-border 
            border border-[#ffffff60] tracking-[1px] px-3 py-[4px] rounded-[8px]
            focus:outline-none text-[16px] leading-7 cursor-not-allowed '/>
        </div>

        <div className='w-full h-max flex flex-col'>
            <label htmlFor='username' 
            className='flex text-[16px] text-gray-100 mb-1 pl-1' >
                Username
            </label>
            <input type='text' 
            name='username' 
            placeholder='Username'
            value={nameInput}
            onChange={(e)=> setNameInput(e.target.value)}
            className='w-full h-max bg-[#323232aa] text-white box-border 
            hover:border-[#ffffff84] focus:border-[#ffffffba] 
            border border-[#ffffff60] tracking-[1px] px-3 py-[4px] rounded-[8px]
            focus:outline-none text-[16px] leading-7 placeholder:text-[#989898]'/>
        </div>

        <div className='w-full h-max flex items-center justify-end mt-2'>
            <button onClick={handleUpdateNameBtn}
            disabled={buttonDisabled}
            className={'w-max h-max px-2.5 py-1 '+
            ' rounded-[5px] text-[16px] duration-75 ease-linear '+
            (buttonDisabled ? ' cursor-not-allowed text-gray-400 bg-[#505050] opacity-70 ' 
            : ' text-white hover:bg-[#7f7f7f] bg-[#505050]')} >
                Update
            </button>
        </div>
        
    </div>
    </>
  )
}

export default Username