"use client"

import React from 'react'
import { LeftOutlined } from '@ant-design/icons';
import { Form, Input, message } from 'antd';

const Create_AdminForm = ({ toggleCreateBtn, existingAdmins,adminId }) => {
    const [form] = Form.useForm();

    const onFinish = async (adminInfo) => {
        delete adminInfo.confirm

        if(adminId === "649de1b33c34fa9777057510") {
          message.info(`Restricted for admin@demo.com`)
        } else {
          try {
            const response = await fetch("/api/admin/new", {
              method: "POST",
              body: JSON.stringify(adminInfo),
            });
            const data = await response.json();
            console.log(data)
            if (response.ok) {
                existingAdmins.push(data)
                form.resetFields()
                message.success('Admin successfully added.')
                toggleCreateBtn()
            }
          } catch (error) {
            console.log(error);
          }
        }
    }


    const formItemRules = [
        {
          required: true,
          // message: 'Please fill this field!',
        },
    ]

  return (
    <>
    <div className='my-4 w-full h-max flex items-center justify-between xl:px-14 lg:px-10 px-6'>
      <div className='md:text-[22px] text-[18px] font-semibold' >
        Create Admin
      </div>
      <div>
        <button onClick={toggleCreateBtn}
            className='px-3 py-1.5 ring-inset ring-gray-500 ring-2
            rounded-lg md:text-[16px] text-[14px] mr-4  flex items-center'>
            <LeftOutlined className='mr-1' />
            Back
        </button>
      </div>
    </div>

    <div className='xl:px-14 lg:px-10 px-6 '>
        <Form 
        onFinish={onFinish} form={form}
        autoComplete='off'  
        className="grid gap-y-2.5 w-full ">

        <div className='grid lg:grid-cols-2 gap-y-2 gap-x-10 w-full'>
            <Form.Item label="Name" name='name' rules={formItemRules} >
                <Input />
            </Form.Item>

            <Form.Item label="Email" name='email' 
            rules={[
                {
                  type: 'email',
                  message: 'Enter valid E-mail!',
                },
                {
                  required: true,
                },
              ]} >
                <Input />
            </Form.Item>
        </div>

        <div className='grid lg:grid-cols-2 gap-y-2 gap-x-10 w-full'>
            <Form.Item label="Password" name='password' 
                rules={[
                    {
                        min: 6,
                        message: 'Minimum length is 6',
                    },
                    {
                        required: true,
                    },
                ]} >
                <Input.Password />
            </Form.Item>

            <Form.Item label="Confirm Password" name='confirm' disabled={true}
                rules={[
                    {   required: true,
                        message: 'Please confirm your password!', },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('The two passwords do not match!'));
                        },
                    }),
                ]} >
                <Input.Password />
            </Form.Item>
        </div>
        
        <Form.Item>
            <button type="submit"
                className='px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700
                rounded-lg text-white text-[16px] w-max'>
                Add Admin
            </button>
        </Form.Item>
        
        </Form>
    </div>
    </>
  )
}

export default Create_AdminForm