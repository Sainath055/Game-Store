"use client"

import React, { useEffect, useState } from 'react'
import { useSession, } from "next-auth/react"
import { Descriptions, List, message,Table } from 'antd';
import { PlusOutlined} from '@ant-design/icons';
import Create_AdminForm from '@/components/Admin_components/Create_AdminForm';
import { redirect } from 'next/navigation';
import Loader_Admin from '@/components/Admin_components/Loader_Admin';

const Admins = () => {
  const defaultAdminEmail = 'admin@default.com'
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect(`/auth`)
    }
  })
  var userCheck = session && session.user.isAdmin
  const [isLoading, setLoading] = useState(true);

  var currentAdminEmail = session ? session.user.email : 'null'
  var defaultAdmin = defaultAdminEmail === currentAdminEmail

  const { Column } = Table;

  const [createForm, setCreateForm] = useState(true);
  const [existingAdmins, setExistingAdmins] = useState([]);

  const fetchAdmins = async () => {
    const response = await fetch("/api/admin");
    const data = await response.json();

    setExistingAdmins(data);
    setLoading(false)
  }

  useEffect(() => {
    if(userCheck){
      fetchAdmins();
    }
  }, [userCheck]);

  const toggleCreateBtn = () => {
    // setCreateForm((prevcreateForm) =>!prevcreateForm);
    setCreateForm(!createForm)
  }

  const delAdminBtn = async (id) => {
   
    if(adminId === "649de1b33c34fa9777057510") {
      message.info(`Restricted for admin@demo.com`)
    } else {
      try {
        const response = await fetch(`/api/admin/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          const filteredAdmins = existingAdmins.filter((item) => item._id !== id);
          message.success('Admin deleted successfully')
          setExistingAdmins(filteredAdmins)
        }
      } catch (error) {
        console.log(error);
      }
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
    {createForm ? 
    <div className='pb-6'>
      <div className='mt-4 mb-2 w-full h-max md:items-center xl:px-14 lg:px-10 px-6
        md:text-[22px] text-[18px] font-semibold flex md:flex-row flex-col'>
          Default Admin
          {defaultAdmin ? 
            <div className='bg-green-100 text-green-600 border-green-500
              md:ml-2 w-max px-2 py-0.5 border text-[14px] rounded-md font-medium'>
              Logged-In
            </div> 
          : null}
      </div>

      <div className='xl:px-14 lg:px-10 px-6 '>
      <Descriptions bordered size='middle' style={{backgroundColor: 'white',}}
        column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1, }}>
        <Descriptions.Item label="Name">Admin</Descriptions.Item>
        <Descriptions.Item label="Email">admin@default.com</Descriptions.Item>
      </Descriptions>
      </div>

      <div className='w-full h-[30px]'></div>

      <div className='my-4 w-full h-max flex items-center justify-between xl:px-14 lg:px-10 px-6'>
        <div className='md:text-[22px] text-[18px] font-semibold 
          flex md:flex-row flex-col items-center'>
          Existing Admins
        </div>
        <button onClick={toggleCreateBtn}
          className='px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg 
          text-white md:text-[16px] text-[14px] flex items-center'>
          <PlusOutlined className='mr-1' />
          Add Admin
        </button>
      </div>

      <Table bordered 
        className='xl:px-14 lg:px-10 px-6'
        rowKey={record => record._id}
        pagination={false}
        dataSource={existingAdmins} 
        >
        <Column title="Name" key="name" dataIndex='name' ellipsis={true}  />
        <Column title="Email" dataIndex="email" key="email" ellipsis={true}  />
        <Column ellipsis={true} title="Action" key="action" 
          render={(_, record) => (
            <div key={record._id} >
              {currentAdminEmail === record.email ? 
                <div className='bg-green-100 text-green-600 border-green-500
                  w-max px-2 py-0.5 border-2 text-[14px] rounded-md font-medium'>
                  Logged-In
                </div> 
                :
                <button className='px-2.5 py-1 hover:text-white rounded-md
                  hover:bg-red-600 ml-1 ring-1 ring-gray-400 ring-inset hover:ring-0'
                  onClick={()=>delAdminBtn(record._id)}>
                  Delete
                </button>
              }
            </div>
          )}
        />
      </Table>
    </div>
    : 
    <div>
      <Create_AdminForm adminId={session.user.id}
      toggleCreateBtn={toggleCreateBtn}
      existingAdmins={existingAdmins} /> 
     
    </div>
    }
    </>
  )
}

export default Admins