import React, { useState, useEffect } from 'react'
import './PaymentTable.css'
import { Table } from 'antd';
import Loading from '../UI/Loading';

const PaymentTable = (props) => {

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // const [bookedServicesList, setBookedServicesList] = useState([]);
  // const [search, setSearch] = useState("");
  // const [filterBookedServicesListByName, setFilterBookedServicesListByName] = useState([]);

  // const getBookedServicesList = async () => {
  //   try {
  //     const resultBookedServices = await axios.get(`${ROUTER}/api/bookedservices`)

  //     const tmp = resultBookedServices.data.bookedService;

  //     const newBookedServicesList = tmp.map(obj => ({
  //       ...obj,
  //       date: new Date(obj.date).toLocaleDateString('en-GB')
  //     }));

  //     setBookedServicesList(newBookedServicesList)
  //     setFilterBookedServicesListByName(newBookedServicesList)

  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // const handleDetailBookedServices = () => {

  // }

  // const columns = [
  //   {
  //     name: "Patient",
  //     selector: (row) => row.user_id,
  //   },
  //   {
  //     name: "Responsible Doctor",
  //     selector: (row) => row.doctor_id,
  //   },
  //   {
  //     name: "Date",
  //     selector: (row) => row.date,
  //   },
  //   {
  //     name: "Slot",
  //     selector: (row) => row.slot_time,
  //     sortable: true
  //   },
  //   {
  //     name: "Status",
  //     selector: (row) => "row.isConfirm",
  //   },
  //   {
  //     name: "Action",
  //     cell: (row) => <div className='edit-button' onClick={handleDetailBookedServices}><i class="ri-edit-line"></i></div>
  //   }

  // ]

  // useEffect(() => {
  //   getBookedServicesList()
  // }, [])

  // useEffect(() => {
  //   const result = bookedServicesList.filter(obj => {
  //     return obj.user_id.match(search)
  //   })

  //   setFilterBookedServicesListByName(result)
  // }, [search])

  // return (
  //   <DataTable
  //     columns={columns}
  //     data={filterBookedServicesListByName}
  //     pagination
  //     subHeader
  //     subHeaderComponent={
  //       <input type="text"
  //         placeholder='Search by name patient'
  //         className='w-25 form-control'
  //         value={search}
  //         onChange={(e) => setSearch(e.target.value)}
  //       />}
  //     // selectableRows

  //   />

  // )


  const { data = [], isLoading = false, columns = [], onChange = {}, rowClassName = {}} = props
  console.log('rowClassName', rowClassName)
  return (

    <Loading isLoading={isLoading}>
      <Table
        columns={columns}
        dataSource={data}
        pagination={
          {
            current: page,
            pageSize: pageSize,
            onChange: (page, pageSize) => {
              setPage(page);
              setPageSize(pageSize)
            }
          }
        }
        onChange={onChange}
        {...props}
        bordered
        rowClassName={rowClassName}
      />
    </Loading>

  );
}

export default PaymentTable