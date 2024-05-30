import React, { useContext, useEffect, useState } from 'react'
import './css/addingbtn.css'
import {Contectfile} from '../context/contectfile'
import { FaUserAlt } from "react-icons/fa";
import { FaListUl } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

const adding = () => {

    const [active,setactive] = useState('')
    const changing=(namee)=>
        {
            setactive(namee)
        }

    const {addclientdata,addprojectdata} = useContext(Contectfile)



        //-----------------adding client details------------------------

        const [clientdata,setclientdata] = useState({
            clientemail:'',
            clientname:'',
            clientcontactnumber:''
        })

        const handleclient = (e)=>
        {
            setclientdata({...clientdata,[e.target.name]:e.target.value})   
        }

        const callclient = async () =>
        {
            if(clientdata.clientemail==='' || clientdata.clientname==='' || clientdata.clientcontactnumber==='')
            {
                alert('all fields are required')
            }  
            else
            {
                const resultclient = await addclientdata(clientdata)
                setclientdata({
                    clientemail:'',
                    clientname:'',
                    clientcontactnumber:''
                })
                if(resultclient)
                {
                    alert('successfully added')
                }
                else{
                    alert('something went wrong')
                }
            } 
        }



        //-----------------------displaying client name------------------

        const[result,setresult] = useState([])
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

        //-----------------------project data ----------------------------

        const [projectdata,setprojectdata] = useState({
            projecttopic:'',
            projectdescription:'',
            projectstatus:'',
            projectclient:''
        })

        const handleproject =(e) =>{ setprojectdata({...projectdata,[e.target.name]:e.target.value}) }

        const callproject = async () =>
        {
            let resultproject;

            if(projectdata.projecttopic==='' || projectdata.projectdescription==='' || projectdata.projectstatus==='' || projectdata.projectclient==='')
            {
                alert('all fields are mandatory')
            }
            else
            {
                resultproject = await addprojectdata(projectdata);
                setprojectdata
                ({
                    projecttopic:'',
                    projectdescription:'',
                    projectstatus:'',
                    projectclient:''
                })
                if(resultproject.success)
                    {
                        alert("Successfully added")
                    }
                    else
                    {
                        alert("something went wrong")
                    }
            }
        }

  return (
    <div className='add'>
        <div className="addbuttons">
            <div className="addclient">
                <button onClick ={()=>changing('addclient')}> <FaUserAlt /> Add Client</button>
            </div>
            <div className="addproject">
                <button onClick ={()=>changing('addproject')}> <FaListUl /> Add Project</button>
            </div>
        </div>
        <div className={`add-client-form ${active==='addclient'?'activediv':''}`}>
            <div className="add-client-middle">
                <div className="add-client-getdetails">
                    <p onClick={()=>setactive("")}><span><FaTimes /></span></p>
                    <h1>Add Client</h1>
                    <div className="clientdetails">
                    <div className="addemail">
                        <label>Client Email :</label>
                        <input type="text" name="clientemail" placeholder='Enter Email' value={clientdata.clientemail} onChange={handleclient}/>
                    </div>
                    <div className="addusername">
                        <label>Client Username :</label>
                        <input type="text" name="clientname" placeholder='Enter Client name' value={clientdata.clientname} onChange={handleclient}/>
                    </div>
                    <div className="addphonenumber">
                        <label>Client Contact Number :</label>
                        <input type="text" name="clientcontactnumber" placeholder='Enter Client contact number' value={clientdata.clientcontactnumber} onChange={handleclient} />
                    </div>
                    <div className="clientsubmit">
                        <button onClick={()=>callclient()}>Add Client</button>
                    </div>
                    <div className="clientcancel">
                        <button onClick={()=>setactive("")}>Close</button>
                    </div>
                    </div>
                    
                </div>
            </div>
        </div>
        <div className={`add-project-form ${active==='addproject'?'activediv':''}`}>
            <div className="add-project-middle">
                <div className="add-project-getdetails">
                <p onClick={()=>setactive("")}><span><FaTimes /></span></p>
                <h1>Add Project</h1>
                    <div className="projectdetails">
                    <div className="add-project">
                        <label>Project Title :</label>
                        <input type="text" placeholder='Enter Project Title' name='projecttopic' value={projectdata.projecttopic} onChange={handleproject}/>
                    </div>
                    <div className="adddescription">
                        <label>Project Description :</label>
                        <textarea type="text" placeholder='Enter Project description' name='projectdescription' value={projectdata.projectdescription} onChange={handleproject}/>
                    </div>
                    <div className="projectstatus">
                        <label>Project Status :</label>
                        <select name="projectstatus" onChange={handleproject}>
                            <option>select status</option>
                            <option value="New Project">New Project</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <div className="projectclient">
                        <label>Client's project :</label>
                        <select name="projectclient" onChange={handleproject}>
                            <option>select client</option>
                        {result.map((re,i)=>(
                            <option key={i} value={re.clientname}>{re.clientname}</option>
                        ))}
                        </select>
                    </div>
                    <div className="projectsubmit">
                        <button onClick={()=>callproject()}>Add Project</button>
                    </div>
                    <div className="projectcancel">
                        <button onClick={()=>setactive("")}>Close</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default adding