import { Input } from 'antd'
import React from 'react'

const InputComponent = ({size, placeholder, bordered, style, userName, ...rests }) => {
  // console.log(userName)
  return (
    <Input 
        size={size} 
        placeholder={placeholder} 
        bordered={bordered} 
        style={style}
        defaultValue={userName}
        {...rests} 
    />
  )
}

export default InputComponent