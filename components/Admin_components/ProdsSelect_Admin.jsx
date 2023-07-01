"use client"

import '../../app/globals.css'
import { Button, Radio, Table, message } from 'antd';
import React, { useState } from 'react';
import { LeftOutlined} from '@ant-design/icons';


const ProdsSelect_Admin = ({ setBannerList, setSideSecList, setSideSecHeading,
  sideSecHeading, setGoToSelect, goToSelect, allLessData, adminId }) => {

  const { Column } = Table;

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedTitles, setSelectedTitles] = useState([]);
  const [heading, setHeading] = useState(sideSecHeading);

  const submitSelected = async () => {
    const theId = "64668c9b4259575660c6db40"

    if(goToSelect === 5) {
      var data = {
        bannerList: selectedRowKeys,
        bannerTitles: selectedTitles
      }
    }else{
      var data = {
        sideHeading: heading,
        sideSecList: selectedRowKeys,
        sideSecTitles: selectedTitles
      }
    }
    
    if(adminId === "649de1b33c34fa9777057510") {
      message.info(`Restricted for admin@demo.com`)
    } else {
      try {
        const response = await fetch(`/api/banner&sideSec/${theId}`, {
          method: "PATCH",
          body: JSON.stringify(data),
        });
        if (response.ok) {
          if (goToSelect === 5) {
            setBannerList(selectedTitles)
          }else{
            setSideSecList(selectedTitles)
            setSideSecHeading(heading)
          }
          message.success('Data updated successfully')
          setGoToSelect(0)
        }
      } catch (error) {
        console.log(error);
      }
    }

  };

  const onSelectChange = (selectedKeys, selectedRows) => {
    var onlyTitles = selectedRows.map((val) => (val.title))
    setSelectedTitles(onlyTitles)
    setSelectedRowKeys(selectedKeys)
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (record) => ({
      disabled: selectedRowKeys.length >= goToSelect && !selectedRowKeys.includes(record._id),
    }),
  };

  var minSelect = goToSelect===5 ? 3 : 6;
  const hasSelected = selectedRowKeys.length >= Number(minSelect);
  
  return (
    <>
    <div className='my-4 w-full h-max flex items-center justify-between xl:px-14 lg:px-10 px-6'>
      <div className='md:text-[22px] text-[18px] font-semibold' >
        {goToSelect === 5 ? 'Banner [Min-3 Max-5]' : 'Side Section [Required-6]' }
      </div>
      <div className='w-max h-max flex items-center'>
        <button onClick={()=>setGoToSelect(0)}
            className='px-3 py-1.5 ring-inset ring-gray-500 ring-2
            rounded-lg md:text-[16px] text-[14px] mr-4 flex items-center'>
            <LeftOutlined className='mr-1' />
            Back to List
        </button>
        <button onClick={submitSelected} disabled={!hasSelected}
            className={'px-3 py-1.5 '+ 
            'rounded-lg text-white md:text-[16px] text-[14px] ' +
            (hasSelected ? ' bg-blue-600 hover:bg-blue-700 ' :
              ' cursor-not-allowed opacity-70 bg-gray-600/50 ')}>
            Update Data
        </button>
      </div>
    </div>

    {goToSelect === 5 ? null : 
    <div className='my-4 w-full h-max flex items-center xl:px-14 lg:px-10 px-6'>
      <p className='mr-3 text-[18px]'>Change Heading:</p>
      <Radio.Group defaultValue={heading} buttonStyle="solid" 
        onChange={(e)=> setHeading(e.target.value)}>
        <Radio.Button value={'Top Rated'}>Top Rated</Radio.Button>
        <Radio.Button value={'Wild Discounts'}>Wild Discounts</Radio.Button>
        <Radio.Button value={'Most Sold'}>Most Sold</Radio.Button>
        <Radio.Button value={'All Time Best'}>All Time Best</Radio.Button>
      </Radio.Group>
    </div> }

    <Table 
      className='xl:px-14 lg:px-10 px-6'
      rowKey={record => record._id} pagination={{ pageSize: 6, position:["bottomCenter"] }}
      rowSelection={rowSelection} dataSource={allLessData} bordered >
      <Column title="Title" key="title" dataIndex='title' ellipsis={true}  />
      <Column title="Rating" key="rating" dataIndex='rating' ellipsis={true}  />
      <Column title="Price" key="price" dataIndex='price' ellipsis={true}  />
      <Column title="Discount" key="discount" dataIndex='discount' ellipsis={true}  />
    </Table>
    </>
  );
};
export default ProdsSelect_Admin;