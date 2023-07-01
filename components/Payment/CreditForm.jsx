"use client"


import getCardLogo from '@/utils/getCardLogo';
import getCardType from '@/utils/getCardType';
import { Select, message } from 'antd';
import React, { useEffect, useState } from 'react';
import '../../app/globals.css'
import { Asterisk_12 } from '@/assets/LogoSvgs';

const CreditForm = ({ cardData, setCardData, allCardNumbers }) => {

  const [cardNumber, setCardNumber] = useState('');
  const [cardType, setCardType] = useState("");
  const [cvv, setCvv] = useState('');


  const handleCheckBox = (event) => {
    if(allCardNumbers.includes(cardNumber.replace(/\s/g, ""))){
      message.info(`Entered card number is already in your card list, So it won't be saved.`)
      setCardData({...cardData, saveCardData: false })
      event.preventDefault();
    } else {
      setCardData({...cardData, saveCardData: event.target.checked })
    }
  }

  const handleHolderChange = (e) => {
    setCardData({...cardData, cardHolder: e.target.value })
  };

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
    setCardData({...cardData, [e.target.name]: formattedNumber.replace(/\s/g, "") });
    setCardType(type);
  };
  
  let CardLogo = getCardLogo(cardType); 

  const handleCvvInput = (e) => {
    const input = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
    setCvv(input);
    setCardData({...cardData, cvc: input })
  };

  const generateMonthOptions = () => {
    const months = [];
    for (let i = 1; i <= 12; i++) {
      const monthValue = i.toString().padStart(2, '0');
      const monthOption = {
        value: monthValue,
        label: monthValue,
      };
      months.push(monthOption);
    }
    return months;
  };

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear + 1 ; i < currentYear + 12; i++) {
      const yearValue = i.toString();
      const yearOption = {
        value: yearValue,
        label: yearValue,
      };
      years.push(yearOption);
    }
    return years;
  };
  
  const monthOptions = generateMonthOptions();
  const yearOptions = generateYearOptions();

  const handleMonthOptions = (value) => {
    setCardData({...cardData, exp_month: value })
  };

  const handleYearOptions = (value) => {
    setCardData({...cardData, exp_year: value })
  };


  return (
    <>
    <div className='w-full h-max flex flex-col items-center justify-center py-8 sm:px-4 px-6'>
      <form 
      className='md:w-[65%] sm:w-[80%] w-full h-max flex flex-col items-center gap-y-5 mb-2'>
        
        <div className='w-full h-max flex flex-col'>
          <label htmlFor='cardHolder' 
          className='flex text-[14px] text-gray-100 mb-0.5' >
            Card Holder<Asterisk_12 />
          </label>
          <input type='text' 
          name='cardHolder' 
          placeholder='Nathan Drake'
          onChange={handleHolderChange} 
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
              pattern="[0-9]*" 
              inputMode="numeric" 
              value={cardNumber}
              maxLength={19} 
              name='cardNumber'
              placeholder='#### #### #### ####' 
              onChange={handleCardNumberInput} 
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
                placeholder='MM'
                options={monthOptions}
                size='large'
                onChange={handleMonthOptions}
              />
              <Select className='w-full h-max text-white 
              border border-transparent focus:border-transparent '
                placeholder='YYYY'
                options={yearOptions}
                size='large'
                onChange={handleYearOptions}
              />
            </div>
          </div>
    
          <div className='w-[50%] h-max flex flex-col'>
            <label htmlFor='cvc'className='flex text-[14px] text-gray-100 mb-0.5'>
              CVV<Asterisk_12 />
            </label>
            <input 
            type='text'
            pattern="[0-9]*" 
            inputMode="numeric"
            maxLength={4} 
            name='cvc' 
            placeholder='####'
            value={cvv}
            onChange={handleCvvInput} 
            className='w-full h-max bg-[#323232aa] text-white box-border
            hover:border-[#ffffff84] focus:border-[#ffffffba]
            border border-[#ffffff60] tracking-[1px] px-2.5 py-[4px] rounded-[8px]
            focus:outline-none text-[16px] leading-7 placeholder:text-[#989898]'/>
          </div>

        </div>

        <div className='w-full h-max flex items-center px-1' >
          <label className="checkBoxLabel flex items-center">
            <input type="checkbox" onChange={handleCheckBox} />
            <svg className='w-[18px] h-[18px] mr-2'
              viewBox="0 0 64 64" >
              <path d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16" 
              pathLength="575.0541381835938" 
              className="path"></path>
            </svg><p className='text-[14px] text-gray-100'>Save this card for future payments.</p>
          </label>
        </div>

      </form>
    </div>
    </>
  )
}

export default CreditForm