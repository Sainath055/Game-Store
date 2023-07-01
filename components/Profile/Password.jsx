"use client"

import { message } from 'antd';
import React, { useState } from 'react'

const Password = ({ id, googleUser }) => {

    const [oldPass, setOldPass] = useState('');
    const [newPass, setnewPass] = useState('');
    const [conNewPass, setConNewPass] = useState('');

    const [passMatch, setPassMatch] = useState(false);

    function allInputsClear() {
        setOldPass('');
        setnewPass('');
        setConNewPass('');
    }    

    function isButtonDisabled() {
        const oldPassCheck = oldPass.length >= 6; 
        const newPassCheck = newPass.length >= 6; 
        const conNewPassCheck = conNewPass.length >= 6; 
        return oldPassCheck && newPassCheck && conNewPassCheck;
    }

    const buttonDisabled = isButtonDisabled();

    const handleUpdatePassBtn = async (e) => {
        e.preventDefault();
        if(newPass === conNewPass) {
            setPassMatch(false)
            if(newPass === oldPass) {
                message.info(`New password must not be same as old password.`)
            } else {
                if(id === "649d28ad12a2714867932e2a") {
                    message.info(`Restricted for User@demo.com`)
                } else {
                    try {
                        const response = await fetch(`/api/user/password/${id.toString()}`, { 
                            method: "PATCH",
                            body: JSON.stringify({
                                oldPass: oldPass,
                                newPass: newPass,
                            })
                        }); 
                        const data = await response.json();
                            if (response.ok) {
                                message.success(`${data}`,8)
                                allInputsClear()
                            } else {
                                message.error(`${data}`,5)
                            }
                    } catch (error) {
                        console.log(error);
                    } 
                }
            }
        } else {
            setPassMatch(true)
            message.warning(`passwords does not match!`)
        } 
    }

  return (
    <>
    {googleUser ? 
    <div className='w-full h-full flex items-center justify-center'>
        Restricted for Google Accounts
    </div>
    :
    <form className='w-full h-max flex flex-col justify-center gap-y-3 lg:px-10 sm:px-5 px-4'>

        <div className='w-full h-max flex flex-col'>
            <label htmlFor='old_password' 
            className='flex text-[16px] text-gray-100 mb-1 pl-1' >
                Old Password
            </label>
            <input type='password'
            minLength={6} 
            value={oldPass}
            onChange={(e)=> {
                var val = e.target.value
                const trimedval = val.trim()
                setOldPass(trimedval)
            }}
            name='old_password'
            className='w-full h-max bg-[#323232aa] text-white box-border 
            hover:border-[#ffffff84] focus:border-[#ffffffba] 
            border border-[#ffffff60] tracking-[1px] px-3 py-[4px] rounded-[8px]
            focus:outline-none text-[16px] leading-7 placeholder:text-[#989898]'/>
        </div>

        <div className='w-full h-max flex flex-col'>
            <label htmlFor='new_password' 
            className='flex text-[16px] text-gray-100 mb-1 pl-1' >
                New Password
            </label>
            <input type='password' 
            placeholder='Minimum 6 characters'
            minLength={6} 
            value={newPass}
            onChange={(e)=> {
                var val = e.target.value
                const trimedval = val.trim()
                setnewPass(trimedval)
                if(trimedval === conNewPass) {
                    setPassMatch(false)
                }
            }}
            name='new_password' 
            className={'w-full h-max bg-[#323232aa] text-white box-border '+
            ' border tracking-[1px] px-3 py-[4px] rounded-[8px] '+
            ' focus:outline-none text-[16px] leading-7 placeholder:text-[#989898] '+
            (passMatch ? ' border-red-500 ' : 
            ' border-[#ffffff60] hover:border-[#ffffff84] focus:border-[#ffffffba] ')}/>
        </div>

        <div className='w-full h-max flex flex-col'>
            <label htmlFor='c_password' 
            className='flex text-[16px] text-gray-100 mb-1 pl-1' >
                Confirm New Password
            </label>
            <input type='password'
            placeholder='######'  
            minLength={6} 
            value={conNewPass}
            onChange={(e)=> {
                var val = e.target.value
                const trimedval = val.trim()
                setConNewPass(trimedval)
                if(trimedval === newPass) {
                    setPassMatch(false)
                }
            }}
            name='c_password' 
            className={'w-full h-max bg-[#323232aa] text-white box-border '+
            ' border tracking-[1px] px-3 py-[4px] rounded-[8px] '+
            ' focus:outline-none text-[16px] leading-7 placeholder:text-[#989898] '+
            (passMatch ? ' border-red-500 ' : 
            ' border-[#ffffff60] hover:border-[#ffffff84] focus:border-[#ffffffba] ')}/>
        </div>

        <div className='w-full h-max flex items-center justify-end mt-2'>
            <button onClick={handleUpdatePassBtn}
            disabled={!buttonDisabled}
            className={'w-max h-max px-2.5 py-1 '+
            ' rounded-[5px] text-[16px] duration-75 ease-linear '+
            (!buttonDisabled ? ' cursor-not-allowed text-gray-400 bg-[#505050] opacity-70 ' 
            : ' text-white hover:bg-[#7f7f7f] bg-[#505050]')} >
                Update
            </button>
        </div>

    </form>
    }
    </>
  )
}

export default Password