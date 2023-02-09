import { faker } from '@faker-js/faker';
import React, { useState } from 'react'
import { BsArrowLeft, BsPlus } from 'react-icons/bs';
import ServiceDetail from '../components/ServiceDetail/ServiceDetail';
import ServiceTable from '../components/ServiceTable/ServiceTable';

const demoServices = () => [
  {
    id: faker.datatype.uuid(),
    fullname: faker.name.fullName(),
    price: faker.commerce.price(100000, 2000000),
    name: faker.commerce.productName()
  },
  {
    id: faker.datatype.uuid(),
    fullname: faker.name.fullName(),
    price: faker.commerce.price(100000, 2000000),
    name: faker.commerce.productName()
  },
  {
    id: faker.datatype.uuid(),
    fullname: faker.name.fullName(),
    price: faker.commerce.price(100000, 2000000),
    name: faker.commerce.productName()
  },
  {
    id: faker.datatype.uuid(),
    fullname: faker.name.fullName(),
    price: faker.commerce.price(100000, 2000000),
    name: faker.commerce.productName()
  },
  {
    id: faker.datatype.uuid(),
    fullname: faker.name.fullName(),
    price: faker.commerce.price(100000, 2000000),
    name: faker.commerce.productName()
  }
]

const Service = () => {
  const [serviceList, setServiceList] = useState(demoServices);
  const [createService, setcreateService] = useState(false);
  const [serviceDetail, setServiceDetail] = useState(null);

  const onClickEditService = (id) => {
    if (!id) return;
    setcreateService(!createService)
    setServiceDetail(serviceList.find(service => service.id === id))
  }

  const onSelectCreateService = () => {
    if (serviceDetail) setServiceDetail(null);
    setcreateService(true)
  }

  return (
    <div className='bg-light container w-100 h-100 d-flex flex-column gap-3'>
      <div className='row'>
        {/* Header */}
        <div class="col-12 d-flex align-items-center py-3 justify-content-between">
          {
            createService ?
              <button onClick={() => setcreateService(false)} className='m-0 d-flex gap-2 back-button btn justify-content-center align-items-center'><BsArrowLeft /> BACK</button> :
              <h4 className='m-0'>SERVICE</h4>
          }
          {
            createService ? <button class="btn btn-primary" style={{ width: "10%" }} type="submit"> Save </button> : <button onClick={() => onSelectCreateService()} class="btn btn-primary" style={{ width: "10%" }} type="submit"> <BsPlus className='fs-5' />Add New</button>
          }
        </div>

        {
          createService ?
            <ServiceDetail serviceDetail={serviceDetail} /> :
            <ServiceTable services={serviceList} onClickEditService={onClickEditService} />
        }


      </div>
    </div>
  )
}

export default Service