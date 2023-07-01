"use client"

import { Asterisk_12, MultiplySymbol } from '@/assets/LogoSvgs'
import { SameCardNumcheck, checkCardValuesNoCvc, similarCardCheck } from '@/utils/checkCardFormPop';
import getCardLogo from '@/utils/getCardLogo';
import getCardType from '@/utils/getCardType';
import { generateMonthOptions, generateYearOptions } from '@/utils/getMonth_Year';
import { Select, message } from 'antd';
import React, { useEffect, useState } from 'react'

const initialCard = { 
    cardNumber: '',
    cardHolder: '',
    exp_month: '',
    exp_year: '', 
  }

const CardFormPop = ({ id, editMode, setEditMode, 
    setOpenPop, cardData, setCardData, selectedCard,
    userData, setUserData }) => {

    const [cardNumber, setCardNumber] = useState('');
    const [cardType, setCardType] = useState('');

    useEffect(() => {
        if(editMode) {
            const type = getCardType(cardData.cardNumber);
            setCardType(type);

            const formattedInput = cardData.cardNumber
            let formattedNumber = '';
            if(type === 'Amex'){
            if (formattedInput.length > 0) {
                formattedNumber = formattedInput.replace(/(\d{4})(\d{6})(\d{5})/, '$1 $2 $3');// Custom whitespace for Amex
            }
            } else {
            if (formattedInput.length > 0) {
                formattedNumber = formattedInput.match(/.{1,4}/g).join(' '); // Add a whitespace every 4 characters
            }
            }
            setCardNumber(formattedNumber);
        }
    }, [editMode]);

    const handleCardNumberInput = (e) => {
        const input = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
        const type = getCardType(input);
    
        const formattedInput = input.substring(0, 16); // Limit to 16 characters
        let formattedNumber = '';
        if(type === 'Amex'){
          if (formattedInput.length > 0) {
            formattedNumber = formattedInput.replace(/(\d{4})(\d{6})(\d{5})/, '$1 $2 $3');// Custom whitespace for Amex
          }
        } else {
          if (formattedInput.length > 0) {
            formattedNumber = formattedInput.match(/.{1,4}/g).join(' '); // Add a whitespace every 4 characters
          }
        }
        setCardNumber(formattedNumber);
        setCardData((prevCardData)=> ({...prevCardData, cardNumber: formattedNumber.replace(/\s/g, "") }));
        setCardType(type);
    };

    var CardLogo = getCardLogo(cardType); 

    const monthOptions = generateMonthOptions();
    const yearOptions = generateYearOptions();

    const handleMonthOptions = (value) => {
        setCardData({...cardData, exp_month: value })
    };
  
    const handleYearOptions = (value) => {
        setCardData({...cardData, exp_year: value })
    };

    function allClear() {
        setOpenPop(false)
        setCardData(initialCard)
        setCardType('')
        setCardNumber('')
        setEditMode(false)
    }

    const handleSubmitBtn = async (e) => {
        e.preventDefault()

        var SameNumcheck = SameCardNumcheck(cardData.cardNumber, userData.cardList)

        if(editMode){
            var similarCheck = similarCardCheck(selectedCard, cardData)
            if(similarCheck) {
                message.info(`Please enter new information`)
            } else {
                if(SameNumcheck) {
                    message.info(`Card number already exists in your card list`)
                } else {
                    try {
                        const response = await fetch(`/api/user/cardList/${id.toString()}`, { 
                            method: "PATCH",
                            body: JSON.stringify({
                                cardData: cardData,
                                selectedCardNumber: selectedCard.cardNumber,
                            })
                        }); 
                        const data = await response.json();
                            if (response.ok) {
                                const index = userData.cardList.findIndex((obj) => obj.cardNumber === selectedCard.cardNumber);
                                userData.cardList.splice(index, 1, cardData);
                                setUserData({ ...userData, cardList: userData.cardList });
                                message.success(`${data}`)
                                allClear()
                            } else {
                                message.error(`${data}`,5)
                            }
                    } catch (error) {
                        console.log(error);
                    } 
                }
            }

        } else {
            if(SameNumcheck) {
                message.info(`Card number already exists in your card list`)
            } else {
                try {
                    const response = await fetch(`/api/user/cardList/${id.toString()}`, { 
                        method: "POST",
                        body: JSON.stringify({
                            cardData: cardData,
                        })
                    }); 
                    const data = await response.json();
                        if (response.ok) {
                            setUserData({ ...userData, cardList: [...userData.cardList, cardData] });
                            message.success(`${data}`)
                            allClear()
                        } else {
                            message.error(`${data}`,5)
                        }
                } catch (error) {
                    console.log(error);
                } 
            }
        }
    }

  return (
    <>
    <div className='md:w-[600px] sm:w-[80%] w-full 
    h-max bg-[#2e2e2e] border border-[#ffffff60] rounded-md 
    flex flex-col items-center p-4 gap-y-5'>

        <div className='w-full h-max flex items-center justify-between'>
            <p className='flex items-center'>
                {editMode ? 'Edit card' : 'Add new card'}
                <a href='https://stripe.com/docs/testing#cards' target='_black'
                className='ml-1 text-[14px] px-2 py-0.5 bg-green-700 rounded-xl
                flex items-center gap-x-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" 
                    width="18px" height="18px" 
                    viewBox="0 0 24 24"><path fill="currentColor" 
                    d="M10.59 13.41c.41.39.41 1.03 0 1.42c-.39.39-1.03.39-1.42 0a5.003 5.003 0 0 1 0-7.07l3.54-3.54a5.003 5.003 0 0 1 7.07 0a5.003 5.003 0 0 1 0 7.07l-1.49 1.49c.01-.82-.12-1.64-.4-2.42l.47-.48a2.982 2.982 0 0 0 0-4.24a2.982 2.982 0 0 0-4.24 0l-3.53 3.53a2.982 2.982 0 0 0 0 4.24m2.82-4.24c.39-.39 1.03-.39 1.42 0a5.003 5.003 0 0 1 0 7.07l-3.54 3.54a5.003 5.003 0 0 1-7.07 0a5.003 5.003 0 0 1 0-7.07l1.49-1.49c-.01.82.12 1.64.4 2.43l-.47.47a2.982 2.982 0 0 0 0 4.24a2.982 2.982 0 0 0 4.24 0l3.53-3.53a2.982 2.982 0 0 0 0-4.24a.973.973 0 0 1 0-1.42Z">
                    </path></svg>
                    Stripe testing
                </a>
            </p>
            <button onClick={()=> allClear()}
            className='w-max h-max' >
                <MultiplySymbol />
            </button>
        </div>

        <form className='w-full h-max flex flex-col items-center gap-y-5 mb-2'>
        
            <div className='w-full h-max flex flex-col'>
            <label htmlFor='cardHolder' 
            className='flex text-[14px] text-gray-100 mb-0.5' >
                Card Holder<Asterisk_12 />
            </label>
            <input type='text' 
            placeholder='Minimum 4 characters'
            value={cardData?.cardHolder}
            onChange={(e)=> setCardData({...cardData, cardHolder: e.target.value })}
            name='cardHolder' 
            className='w-full h-max bg-[#323232aa] text-white box-border 
            hover:border-[#ffffff84] focus:border-[#ffffffba] 
            border border-[#ffffff60] tracking-[1px] px-2.5 py-[4px] rounded-[8px]
            focus:outline-none text-[16px] leading-7 placeholder:text-[#989898]'/>
            </div>

            <div className='w-full h-max flex flex-col'>
            <label htmlFor='cardNumber' className='flex text-[14px] text-gray-100 mb-0.5' >
                Card Number<Asterisk_12 />
            </label>
            <div className='w-full h-max relative flex items-center justify-end'>
                <input type='text'
                value={cardNumber} 
                onChange={handleCardNumberInput}
                pattern="[0-9]*" 
                inputMode="numeric" 
                maxLength={19} 
                name='cardNumber'
                className='w-full h-max bg-[#323232aa] text-white box-border
                hover:border-[#ffffff84] focus:border-[#ffffffba] 
                border border-[#ffffff60] tracking-[1px] px-2.5 py-[4px] rounded-[8px]
                focus:outline-none text-[16px] leading-7 placeholder:text-[#989898]'/>
                <div className='w-max h-max absolute right-2 text-[#ffffff00]'>
                <CardLogo />
                </div>
            </div>
            
            </div>

            <div className='w-full h-max flex items-end justify-between gap-x-4' >

            <div className='w-full h-max flex flex-col items-start'>
                <label className='flex text-[14px] text-gray-100 mb-0.5' >
                Expiration date<Asterisk_12 />
                </label>
                <div className='w-full h-max flex items-center justify-between gap-x-2'>
                <Select className='w-full h-max text-white 
                border border-transparent focus:border-transparent '
                    name='exp_month'
                    options={monthOptions}
                    size='large'
                    value={cardData?.exp_month}
                    onChange={handleMonthOptions}
                />
                <Select className='w-full h-max text-white 
                border border-transparent focus:border-transparent '
                    name='exp_year'
                    options={yearOptions}
                    size='large'
                    value={cardData?.exp_year}
                    onChange={handleYearOptions}
                />
                </div>
            </div>

            </div>

            <div className='w-full h-max flex items-center justify-end'>
                <button onClick={handleSubmitBtn} disabled={!checkCardValuesNoCvc(cardData)}
                className={'w-max h-max px-3 py-1 rounded-md border border-[#b2b2b2a2]  ' +
                (checkCardValuesNoCvc(cardData) ? ' bg-[#7e7e7e8a] ' : ' opacity-50 cursor-not-allowed ')}>
                    {editMode > 0 ? 'Update' : 'Save'}
                </button>
            </div>

        </form>


        
    </div>
    </>
  )
}

export default CardFormPop