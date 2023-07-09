"use client"

import React, { useEffect, useState } from 'react'
import CreateProForm_Admin from '@/components/Admin_components/CreateProForm_Admin'
import ProductsTable_Admin from '@/components/Admin_components/ProductsTable_Admin'
import { PlusOutlined, LeftOutlined} from '@ant-design/icons';
import { useSession } from 'next-auth/react';
import Loader_Admin from '@/components/Admin_components/Loader_Admin';


const Products = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect(`/auth`)
    }
  })
  var userCheck = session && session.user.isAdmin

  const [isLoading, setLoading] = useState(true);

  const [createForm, setCreateForm] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState([]);
  const [currProId, setCurrProId] = useState(null);

  const fetchProducts = async () => {
    const response = await fetch("/api/product", { cache: "no-cache" });
    const data = await response.json();

    setAllProducts(data);
    setLoading(false)
  }

  useEffect(() => {
    if(userCheck) {
      fetchProducts();
    }
  }, [userCheck]);

  const toggleCreateBtn = () => {
    // setCreateForm((prevcreateForm) =>!prevcreateForm);
    setCreateForm(!createForm)
    if(currProId){
      setCurrProId(null)
      setCurrentProduct([])
    }
  }

  if (isLoading) {
    // loading state
    return (
      <>
        <Loader_Admin />
      </>
    )
  }

  return (
    <>
    <div className='my-4 w-full h-max flex items-center justify-between xl:px-14 lg:px-10 px-6'>
      <div className='md:text-[22px] text-[18px] font-semibold'>
        {createForm ? (currProId ? 
          <div className='w-max h-max flex lg:flex-row flex-col lg:items-center'>
            Edit Product 
            <p className='lg:ml-2 max-w-max h-min 
              px-2 py-0.5 rounded-md border-amber-600 md:text-[14px] text-[12px]
              border-2 text-amber-600 font-medium'>
              ID: {currProId}
            </p>
          </div>
        : 'Create Product') : 'Products List'}
      </div>
      <button onClick={toggleCreateBtn}
        className='px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg 
        text-white md:text-[16px] text-[14px]  flex items-center'>
        {createForm ? <LeftOutlined className='mr-1' /> : <PlusOutlined className='mr-1' />}
        {createForm ? 'Back to List' : 'Create Product'}
      </button>
    </div>
    {createForm ? 
      <div className='pb-6'>
        <CreateProForm_Admin 
        adminId = {session.user.id}
        fetchProducts={fetchProducts}
        allProducts={allProducts}
        setAllProducts={setAllProducts}
        toggleCreateBtn={toggleCreateBtn} 
        currentProduct={currentProduct}
        currProId={currProId} />
      </div>
    :
      <div className='pb-6'>
        <ProductsTable_Admin 
        adminId = {session.user.id}
        allProducts={allProducts}
        setAllProducts={setAllProducts}
        setCurrentProduct={setCurrentProduct}
        setCurrProId={setCurrProId}
        toggleCreateBtn={toggleCreateBtn} />
      </div>
    }

    </>
  )
}

export default Products