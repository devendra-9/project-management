import React from 'react'
import './css/nav.css'
import { useNavigate } from 'react-router-dom'

const navbar = () => {
    const navigate = useNavigate()
    const logout = () =>
    {
        localStorage.removeItem('token')
        navigate('/');
    }

  return (
    <div className='navbartop'>
        <div className="navbar-head">
            <h1>Project Management</h1>
            <button onClick={()=>logout()}>Logout</button>
        </div>
    </div>
  )
}

export default navbar