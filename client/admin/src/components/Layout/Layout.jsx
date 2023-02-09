import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import AdminRouter from '../../routes/AdminRouter'
import "./layout.css"

const Layout = () => {
  return (
    <div className='d-flex layout'>
      <Sidebar>
      </Sidebar>
      <div className='main'>
        <AdminRouter />
      </div>

    </div>
  )
}

export default Layout