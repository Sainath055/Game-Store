"use client"

import Loader_Admin from '@/components/Admin_components/Loader_Admin';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import moment from 'moment';
import { redirect } from 'next/navigation';
import getCardType from '@/utils/getCardType';
import getCardLogo from '@/utils/getCardLogo';

const Orders = () => {

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect(`/auth`)
    }
  })
  var userCheck = session && session.user.isAdmin

  const { Column } = Table;

  const [isLoading, setLoading] = useState(true);
  const [ordersData, setOrdersData] = useState(null);

  const fetchOrdersData = async () => {
    try {
        const response = await fetch(`/api/orders`, { method: "GET", cache: "no-cache" }); 
        const data = await response.json();
        if (response.ok) {
          setOrdersData(data)
        }
    } catch (error) {
        console.log(error);
    } finally {
        setLoading(false)
    }
  }

  useEffect(() => {
    if(userCheck) {
      fetchOrdersData();
    }
  }, [userCheck]);

  if (isLoading) {
    // loading state
    return (
      <>
        <Loader_Admin />
      </>
    )
  }

  function getPaymentStatusDiv(paymentStatus) {
    const isSuccess = paymentStatus === 'Payment successful';
    const statusClass = isSuccess ? 'border-green-500 bg-green-100 text-green-600' 
    : 'border-red-500 bg-red-100 text-red-600';
  
    return (
      <div className={`w-max h-max px-2 py-0.5 rounded-md
      font-medium text-[14px] ${statusClass}`}>
        {isSuccess ? 'Succeeded' : 'Failed'}
      </div>
    );
  }

  return (
    <>
    {ordersData.length === 0 ? 
      <div className='w-full h-max flex items-center justify-center pt-6'>
        <p>No orders</p>
      </div> 
      :
      <div className='w-full h-max'>
        <div className='w-full h-max md:text-[22px] text-[18px] 
        font-semibold xl:px-14 lg:px-10 px-6 my-4'>
          Orders List
        </div>
        <Table bordered 
          className='xl:px-14 lg:px-10 px-6 '
          rowKey={record => record._id}
          pagination={{ pageSize: 6, position:["bottomCenter"] }}
          dataSource={ordersData}
          expandable={{
            expandedRowRender: (record, i) => {
              const cardType = getCardType(record.cardNumber)
              let CardLogo = getCardLogo(cardType)
              return (
                <div key={record._id} 
                  className='grid md:grid-cols-2 gap-y-2 gap-x-2 w-full' >

                    <div className='w-full h-max flex flex-col p-2 rounded bg-[#f2f2f2] text-[14px]'>
                      <div className='w-full h-max flex items-center justify-between 
                      text-[14px] mb-1 font-medium'>
                        <p>Payment</p>
                        <p>Credit Card</p>
                      </div>
                      <div className='w-full h-max flex items-center justify-between'>
                        <p>Time</p>
                        <p>{moment(record.createdAt).format("h:mm:ss A")}</p>
                      </div>
                      <div className='w-full h-max flex items-center justify-between'>
                        <p>Card Number</p>
                        <p>{record.cardNumber}</p>
                      </div>
                      <div className='w-full h-max flex items-center justify-between'>
                        <p>Card Company</p>
                        <CardLogo />
                        {/* <p>{cardType}</p> */}
                      </div>
                      <div className='w-full h-max flex items-center justify-between 
                      text-[14px] mt-1 font-medium'>
                        <div>
                          {record.paymentStatus != 'Payment successful' ? 
                          'Payment Failed' : 'Amount Paid'}
                        </div>
                        <div>
                          {record.paymentStatus != 'Payment successful' ? 
                          record.paymentStatus.replace(/\.$/, "") : 
                          record.products.reduce((total, product) => total + product.price, 0)}
                        </div>
                      </div>
                    </div>

                    <div className='w-full h-max flex flex-col p-2 rounded bg-[#f2f2f2] text-[14px]'>
                      <div className='w-full h-max flex items-center justify-between 
                      text-[14px] mb-1 font-medium'>
                        <p>Products</p>
                        <p>{record.products.length}</p>
                      </div>
                      {record.products.map((data,i) => (
                        <div key={i} className='w-full h-max flex items-center justify-between'>
                          <p>{data.title}</p>
                          <p>{data.price}</p>
                        </div>
                      ))}
                      <div className='w-full h-max flex items-center justify-between 
                      text-[14px] mt-1 font-medium'>
                        <p>Total</p>
                        <p>{record.products.reduce((total, product) => total + product.price, 0)}</p>
                      </div>
                    </div>

                </div>
              )}
            }} 
          >
          <Column title="Order Id" key="_id" dataIndex='_id' ellipsis={true}  />

          <Column title="Date" dataIndex="createdAt" key="createdAt" ellipsis={true} 
          render={(createdAt) => moment(createdAt).format('D-MM-YYYY')} />

          <Column title="Price" dataIndex="products" key="products" ellipsis={true} 
          render={(products) => products.reduce((total, product) => total + product.price, 0)} />

          <Column title="Payment" dataIndex="paymentStatus" key="paymentStatus" ellipsis={true} 
          render={(paymentStatus) => getPaymentStatusDiv(paymentStatus)} />

        </Table>
      </div>
    }
    </>
  )
}

export default Orders