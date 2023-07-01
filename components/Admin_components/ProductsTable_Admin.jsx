"use client"

import { Table, message } from 'antd'
import moment from 'moment';
import React from 'react'

const ProductsTable_Admin = ({adminId, 
  allProducts, setAllProducts, toggleCreateBtn, setCurrentProduct, setCurrProId}) => {

  const { Column } = Table;

  const delBtn = async (id) => {
    if(adminId === "649de1b33c34fa9777057510") {
      message.info(`Restricted for admin@demo.com`)
    } else {
      try {
        const response = await fetch(`/api/product/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          const filteredProducts = allProducts.filter((item) => item._id !== id);
          message.success('Product deleted successfully')
          setAllProducts(filteredProducts)
        }
      } catch (error) {
        console.log(error);
      }
    }
  }


  return (
    <>
      <Table bordered 
        className='xl:px-14 lg:px-10 px-6'
        rowKey={record => record._id}
        pagination={{ pageSize: 6, position:["bottomCenter"] }}
        dataSource={allProducts}
        expandable={{
          expandedRowRender: (record, i) => (
            <div key={record._id} 
              className='grid md:grid-cols-2 gap-y-1 gap-x-2 w-full' >
              <p className='text-ellipsis line-clamp-1 max-w-max 
              px-2 py-0.5 rounded-md border-green-500 text-[12px]
              border-2 text-green-500 font-medium' >
                Created: {moment(record?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
              </p>
              <p className='text-ellipsis line-clamp-1 max-w-max 
              px-2 py-0.5 rounded-md border-purple-600 text-[12px]
              border-2 text-purple-600 font-medium' >
                Updated: {moment(record?.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}
              </p>
              <p className='text-ellipsis line-clamp-1 max-w-max' >
                Genre:{record.genre.map((each, i) => {
                return <span key={i} 
                  className='bg-gray-200 ml-2 w-max
                  text-[12px] rounded-lg text-center
                  px-1.5 py-0.5'> {each} </span> })} 
              </p>
              <p className='text-ellipsis line-clamp-1 max-w-max' >
                Platform:{record.platform.map((each, i) => {
                return <span key={i} 
                  className='bg-gray-200 ml-2 w-max
                  text-[12px] rounded-lg text-center
                  px-1.5 py-0.5'> {each} </span> })} 
              </p>
              <p>Rating: {record.rating}</p>
              <p>Year: {record.year}</p>
              <p>Price: ₹{record.price}</p>
              <p>Discount: {record.discount}%</p>
              <p className='text-ellipsis line-clamp-1'>Description: {record.description}</p>
              <p className='text-ellipsis line-clamp-1'>MainImg: {record.mainImg}</p>
              <p>VideoLinkKey: {record.videoLinkKey}</p>
              <p>Images: {record.images.length} links</p>
            </div>
          ),
          // rowExpandable: (record) => record.name !== 'Not Expandable',
        }} >
        <Column title="Product Id" key="_id" dataIndex='_id' ellipsis={true}  />
        <Column title="Title" dataIndex="title" key="title" ellipsis={true}  />
        <Column ellipsis={true} title="Action" key="action" 
          render={(_, record) => (
            <div key={record._id} >
              <button className='px-2.5 py-1 text-white rounded-md 
                bg-blue-500 hover:bg-blue-700 mr-1' 
                onClick={()=>{
                  setCurrentProduct(record)
                  setCurrProId(record._id)
                  toggleCreateBtn()
                }}>
                Edit
              </button>
              <button className='px-2.5 py-1 hover:text-white rounded-md
                hover:bg-red-600 ml-1 ring-1 ring-gray-400 ring-inset hover:ring-0'
                onClick={()=>delBtn(record._id)}>
                Delete
              </button>
            </div>
          )}
        />
      </Table>
    </>
  )
}

export default ProductsTable_Admin