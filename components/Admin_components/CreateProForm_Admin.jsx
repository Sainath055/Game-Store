"use client"

import React from 'react'
import './styles.css'
import { Input, InputNumber, Form, Select, Tooltip, Button, DatePicker, message, } from 'antd';
import { MinusCircleOutlined, PlusOutlined, InfoCircleOutlined, StarOutlined, CalendarOutlined } from '@ant-design/icons';

const CreateProForm_Admin = ({ allProducts, setAllProducts, 
  toggleCreateBtn, currentProduct, currProId, adminId }) => {
  const [form] = Form.useForm();

  function updateObjectById(array, id, newData) {
    // Find the index of the object with the specified ID
    const index = array.findIndex(obj => obj._id === id);
    // If the object was found, update its data and return the updated array
    if (index !== -1) {
      const updatedArray = [...array]; // Create a copy of the original array
      updatedArray[index] = { ...updatedArray[index], ...newData };
      return updatedArray
    } 
    // If the object was not found, return the original array
    return array;
  }

  const onFinish = async (productInfo) => { 

    if(adminId === "649de1b33c34fa9777057510") {
      message.info(`Restricted for admin@demo.com`)
    } else {
      if(productInfo.images.length >= 3){
        if(currProId) {
          try {
            const response = await fetch(`/api/product/${currentProduct._id}`, {
              method: "PATCH",
              body: JSON.stringify(productInfo),
            });
            if (response.ok) {
              const updatedProduct = await updateObjectById(allProducts,currentProduct._id,productInfo)
              setAllProducts(updatedProduct)
              form.resetFields()
              message.success('Product updated successfully')
              toggleCreateBtn()
            }
          } catch (error) {
            console.log(error);
          }
        }else {
          try {
            const response = await fetch("/api/product/new", {
              method: "POST",
              body: JSON.stringify(productInfo),
            });
            const data = await response.json();
            if (response.ok) {
              allProducts.push(data)
              form.resetFields()
              message.success('Product successfully added to the DB.')
              toggleCreateBtn()
            }
          } catch (error) {
            console.log(error);
          }
        }
      }else{
        message.warning('Minimum 3 image links are required.')
      }
    }
  }

  // const initialFormData = {
  //   // ...currentProduct
  //     // _id: currentProduct._id, 
  //     // title: currentProduct.title,
  //     // genre: currentProduct.genre,
  //     // rating: currentProduct.rating,
  //     // platform: currentProduct.platform,
  //     // year: currentProduct.year,
  //     // price: currentProduct.price,
  //     // discount: currentProduct.discount,
  //     // description: currentProduct.description,
  //     // mainImg: currentProduct.mainImg,
  //     // videoLinkKey: currentProduct.videoLinkKey,
  //     // images: currentProduct.images,
  // }

  const formItemRules = [
    {
      required: true,
      // message: 'Please fill this field!',
    },
  ]
  
  var platform_options = ['Windows', 'Playstation', 'Xbox']
  var genre_options = ['Action', 'Adventure', 'Puzzle', 'Crime', 
  'Fantasy', 'Sci-Fi', 'Drama', 'Horror', 'Mystery' ]

  return (
    <div className='xl:px-14 lg:px-10 px-6 '>
    <Form initialValues={...currentProduct}
    onFinish={onFinish} form={form}
    autoComplete='off'  
    className="grid gap-y-2.5 w-full ">
      
      <div className='grid lg:grid-cols-2 gap-y-2 gap-x-10 w-full'>
        <Form.Item label="Title" name='title' rules={formItemRules} >
          <Input />
        </Form.Item>

        <Form.Item label="Genre" name='genre' rules={formItemRules} >
          <Select mode="multiple" allowClear >  
            {genre_options.map((val, i) => (
              <Select.Option key={i} value={val}>{val}</Select.Option>
            ))}
          </Select>
        </Form.Item>
      </div>

      <div className='grid lg:grid-cols-2 gap-y-2 gap-x-10 w-full'>
        <Form.Item label="Rating" name='rating' rules={formItemRules} >
          <InputNumber addonBefore={<StarOutlined />} placeholder={'8.5 or 9.8'}
          min={1} max={10} className='w-full' />
        </Form.Item>

        <Form.Item label="Platform" name='platform' rules={formItemRules} >
          <Select mode="multiple" allowClear >  
            {platform_options.map((val, i) => (
              <Select.Option key={i} value={val}>{val}</Select.Option>
            ))}
          </Select>
        </Form.Item>
      </div>

      <div className='grid lg:grid-cols-3 gap-y-2 gap-x-10 w-full'>
        <Form.Item label="Year" name='year' rules={formItemRules} >
          <InputNumber addonBefore={<CalendarOutlined />} placeholder={'Eg: 2013'}
          min={2000} max={2023} className='w-full' />
        </Form.Item>

        <Form.Item label="Price" name='price' rules={formItemRules} >
          <InputNumber addonBefore="₹" placeholder={'max up to 10000/-'}
          min={0} max={10000} className='w-full' />
        </Form.Item>

        <Form.Item label="Discount" name='discount' rules={formItemRules} >
          <InputNumber addonBefore="%" placeholder={'max up to 60%'}
          min={0} max={60} className='w-full' />
        </Form.Item>
      </div>

      <div className='w-full'>
        <Form.Item label="Description" name='description' rules={formItemRules} >
          <Input.TextArea />
        </Form.Item>
      </div>

      <div className='grid lg:grid-cols-2 gap-y-2 gap-x-10 w-full'>
        <Form.Item label="MainImg" name='mainImg' rules={formItemRules} >
          <Input suffix={
        <Tooltip title="Recommended landscape image with dimensions 1080 x 608 px." >
          <InfoCircleOutlined className='text-gray-500 hover:text-blue-600 cursor-pointer'/>
        </Tooltip>
      } />
        </Form.Item>

        <Form.Item label="VideoLinkKey" name='videoLinkKey' rules={formItemRules} >
          <Input />
        </Form.Item>
      </div>

      <div className='flex items-center'>
        <p>Images (links min-3) :</p>
        <Tooltip title={
          <>
          {`Click on "Add field" to add input field and click on`}
          <MinusCircleOutlined className='mx-2 '/>
          {`icon to delete input field.`}
          </>
        }>
          <InfoCircleOutlined className='ml-2 cursor-pointer hover:text-blue-600' />
        </Tooltip> 
      </div>

      <Form.List name="images" className='w-full'>
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...imgField }) => (
            <div key={key} className='w-full flex items-center '>

              <div className='lg:w-[85%] w-full grid md:grid-cols-1 '>
                <Form.Item
                  {...imgField}
                  name={name}
                  rules={[
                    {
                      required: true,
                      message: `link required`,
                    },
                  ]}>
                  <Input
                  placeholder="Link (eg: https://m.media-amazon.com/images/I/71VUNF5-YsL._SX522_.jpg)" />
                </Form.Item>
              </div>

              <div className='w-max h-full text-18 flex items-start md:ml-6 ml-4'>
                <Tooltip title="Remove field." >
                  <MinusCircleOutlined onClick={() => remove(name)} 
                  className='mt-1.5 hover:text-red-500 text-[16px]' />
                </Tooltip>
              </div>

            </div>
          ))}
            <Form.Item>
              <Button type="dashed" className='flex items-center justify-center'
              onClick={() => add()} block icon={<PlusOutlined />}>
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    
    <Form.Item>
      <button type="submit"
        className='px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700
        rounded-lg text-white text-[16px] w-max'>
        {currProId ? 'Update Product' : 'Add Product'}
      </button>
    </Form.Item>
    
    </Form>
    </div>
  )
}

export default CreateProForm_Admin