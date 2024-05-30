import React from 'react'
import {Outlet} from 'react-router-dom'

const authorization = () => {
  const findtoken = localStorage.getItem('token')

  return findtoken ? <Outlet /> : <Navigate to='/' />
}

export default authorization