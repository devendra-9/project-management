import React, { useContext, useEffect, useState } from 'react'
import {Contectfile} from '../context/contectfile'
import { FaTrash } from "react-icons/fa";
import './css/displayclt.css'

const displayclient = () => {
const[result,setresult] = useState([])

const {deleteclient} = useContext(Contectfile)

  // useEffect(()=>{
  function callingclient ()
  {
    
  fetch('http://localhost:4000/user/getdata',{
    method:'GET'
  })
  .then((response)=>response.json())
  .then((data)=>{
        setresult(data.fetchuserdata.client)
  })  

}
 callingclient();
// },[])

const deletecl = async (id) =>
  {
    const deleteresult = await deleteclient(id);
    location.reload()
    if(deleteresult)
      {
        console.log('successfully deleted')
      }
  }


  return (
    <div className='tabledata'>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Contact Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {result.map((re, i) => (
              <tr key={i}>
                <td>{re.clientname}</td>
                <td>{re.clientemail}</td>
                <td>{re.clientcontactnumber}</td>
                <td><button onClick={()=>deletecl(re._id)} id="ddclient"><FaTrash style={{width:'20px',height:'20px',cursor:'pointer'}}/> Delete</button></td>
              </tr>
            ))}
          </tbody>
          
        </table>
    </div>
  )
}

export default displayclient