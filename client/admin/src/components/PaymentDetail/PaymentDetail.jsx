import React from 'react'
import { Drawer } from 'antd'

const PaymentDetail = ({ title = 'Drawer', placement = 'right', isOpen = false, children, ...rests }) => {
    return (
        <>
            <Drawer title={title} placement={placement} open={isOpen} {...rests}>
                {children}
            </Drawer>
        </>
    )
}
export default PaymentDetail