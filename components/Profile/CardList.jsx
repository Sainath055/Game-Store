"use client"

import React, { useState } from 'react'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import getCardType from '@/utils/getCardType'
import getCardLogo from '@/utils/getCardLogo'
import CardFormPop from './CardFormPop'
import { message } from 'antd'
import '../../app/globals.css'

const initialCard = { 
  cardNumber: '',
  cardHolder: '',
  exp_month: '',
  exp_year: '', 
}

const CardList = ({ id, userData, setUserData }) => {

  const [openPop, setOpenPop] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedCard, setSelectedCard] = useState('');
  const [cardData, setCardData] = useState(initialCard);

  const handleEditBtn = async (data) => {
    await new Promise((resolve) => {
      setCardData(data)
      setSelectedCard(data)
      setEditMode(true)
      resolve()
    })
    setOpenPop(true)
  };

  const handleDelBtn = async (cardNumber) => {
    try {
      const response = await fetch(`/api/user/cardList/${id.toString()}?cardNumber=${JSON.stringify(cardNumber)}`, { 
          method: "DELETE",
      }); 
      const data = await response.json();
      if (response.ok) {
          const updatedAllCards = userData.cardList.filter((obj) => obj.cardNumber !== cardNumber);
          setUserData({ ...userData, cardList: updatedAllCards });
          message.success(`${data}`)
      } else {
          message.error(`${data}`,5)
      }
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <>
    <div className='w-full h-full flex flex-col items-center overflow-hidden
    gap-y-5 xl:px-8 lg:px-[50px] md:px-7 sm:px-5 px-4'>

      <div className={'absolute top-0 w-full h-full bg-black/40 ' +
      ' items-center justify-center '+
      (openPop ? ' flex ' : ' hidden ')}>
        <CardFormPop id={id}
        userData={userData}
        setUserData={setUserData}
        setOpenPop={setOpenPop} 
        editMode={editMode}
        setEditMode={setEditMode}
        selectedCard={selectedCard}
        cardData={cardData} 
        setCardData={setCardData} />
      </div>

      <button onClick={()=> setOpenPop(true)}
      className='w-full h-max py-1 rounded-md border border-[#ffffff60]
      flex items-center justify-center bg-[#454545b3] hover:bg-[#6c6c6cb3]'>
        <PlusOutlined className='w-[20px] h-[20px]' /> Add new card
      </button>

      <div className='cardsListDiv w-full h-max flex flex-col gap-y-3 pb-1 overflow-y-scroll'>
        {userData.cardList.map((data, i) => {
          const CardLogo = getCardLogo(getCardType(data.cardNumber));
          return (
            <div key={i} className='w-full h-max rounded-md py-2 sm:px-4 px-2 
            flex items-center border border-[#c3c3c3b6] justify-between
            bg-[#5858587b] hover:border-[#ddddddc3]'>
              <div className='w-max h-max '>
                {CardLogo && <CardLogo />}
              </div>

              <div className='w-max h-max flex flex-col-reverse text-[18px]'>
                <p>{data.cardHolder}</p>
                <div className='w-max h-max flex sm:items-center sm:gap-x-5 sm:flex-row flex-col'>
                  <p>{data.cardNumber}</p>
                  <p>{data.exp_month}/{data.exp_year.slice(-2)}</p>
                </div>
              </div>

              <div className='w-max h-max flex sm:items-center sm:flex-row flex-col sm:gap-x-3 gap-y-1'>
                <button onClick={()=> handleEditBtn(data)}
                className='w-max h-max sm:px-2 sm:py-1 p-1 rounded flex items-center
                text-[16px] border border-[#ffffff60] hover:bg-[#5c5c5cdd]' >
                  <EditOutlined className='w-[18px] h-[18px] sm:hidden block' />
                  <p className='sm:block hidden'>Edit</p>
                </button>
                <button onClick={()=> handleDelBtn(data.cardNumber)}
                className='w-max h-max sm:px-2 sm:py-1 p-1 rounded flex items-center
                text-[16px] border border-[#ffffff60] hover:bg-[#b71313e8]' >
                  <DeleteOutlined className='w-[18px] h-[18px] sm:hidden block' />
                  <p className='sm:block hidden'>Delete</p>
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
    </>

  )
}

export default CardList