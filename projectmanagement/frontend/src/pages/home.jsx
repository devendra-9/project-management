import React from 'react'
import Navbar from '../component/navbar'
import Add from '../component/adding'
import Displayclient from '../component/displayclient'
import Displayproject from '../component/displayproject'

const home = () => {
  return (
    <div className='hometop'>
      <div className="home-main">
        <Navbar />
        <Add />
        <Displayproject />
        <Displayclient />
      </div>
    </div>
  )
}

export default home