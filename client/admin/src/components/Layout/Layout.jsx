import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import AdminRouter from '../../routes/AdminRouter'

const Layout = () => {
  return (
    <div className='d-flex'>
        <Sidebar>
        </Sidebar>
        <div>
            <AdminRouter/>
        </div>
        
    </div>
  )
}

export default Layout