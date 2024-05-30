import React, { useState } from 'react'
import Projectresult from './projectresult'
import './css/displayproj.css'

const displayproject = () => {

const[result,setresult] = useState([])

function getproject () 
{
  fetch('http://localhost:4000/user/getproject')
  .then((response)=>response.json())
  .then((data)=>
  {
    setresult(data.fetchproject.project)
  })
}

getproject();
  

  return (
    <div className='displayproject'>
      <div className="displayproject-head">
      {result.map((pr)=>(
        <div className="displayproject-main" key={pr._id}>
          <Projectresult  project={pr} />
        </div>
      ))}
      </div>
    </div>
  )
}

export default displayproject