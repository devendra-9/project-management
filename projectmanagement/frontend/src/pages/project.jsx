import React, { useContext, useEffect, useState } from 'react'
import './css/projct.css'
import {Contectfile} from '../context/contectfile'
import { FaArrowLeft } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { useFetcher, useNavigate, useParams } from 'react-router-dom'

const project = () => {


  const [updatedproject,setupdatedproject] = useState([])
  const [updatedclient,setupdatedclient] = useState([])
  const navigate= useNavigate();

  let project = []
  let client2 = []
  let getproject = []
  let getclient = []
  let client = ''
  const {id} = useParams();
  const fetchinfo = async (id) =>
    {
        await fetch('http://localhost:4000/user/getprojectdata/'+id)
        .then((response)=>response.json())
        .then((data)=>
        {
          getproject=data.dataall.project
          getclient = data.dataall.client
            
          const lengthpro = getproject.length
          for(let i=0;i<lengthpro;i++)
            {
              if(getproject[i]._id===id)
                {
                  setupdatedproject(getproject[i])
                  client = getproject[i].projectclient
                }
      
            }

            for(let j=0;j<getclient.length;j++)
              {
                if(getclient[j].clientname===client)
                  {
                    setupdatedclient(getclient[j])
                  }
              }

          })
    }
    fetchinfo(id)
  
    project = Object.values(updatedproject)
    client2 = Object.values(updatedclient)
   
    // console.log("this is a project data",updatedproject)
    // console.log("This is a client", updatedclient)
    
    const [active,setactive]=useState('formdata')

    const settingedit = () =>
      {
        if(active==='formdata')
          {
            setactive('formdata2')
          }
        else
          {
            setactive('formdata')
          }
      }



      const {addclientdata,updatepro,deleteproject} = useContext(Contectfile)

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




      //---------------------Updating project of the project-------------------

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
            resultproject = await updatepro(id,projectdata);
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

    const calldelete = async()=>
      {
        const resultdelete = await deleteproject(id);
        if(resultdelete)
          {
            alert('successfully deleted')
            navigate('/home')
          }
          else
          {
            alert('something went wrong')
            navigate('/home')
          }
      }

  return (
    <div className='projectmain'>
      <div className = "project-head">
      <a href={`/home`}><button><FaArrowLeft style={{fontSize:'13px'}} /> back</button></a>
      <div className="projectheader">
        <h2>Project Information</h2>
        <h1>{project[0]}</h1>
        <p><span>Description:</span> {project[1]}</p>
        <p><span>Status:</span> {project[2]}</p>
      </div>

      <div className="clientinfo">
        <h2>Client Information</h2>
        <table>
          <tr><td><FaUser style={{fontSize:'15px'}}/> {client2[0]}</td></tr>
          <tr><td> <FaEnvelope style={{fontSize:'15px'}} /> {client2[1]}</td></tr>
          <tr><td> <FaPhoneAlt style={{fontSize:'15px'}} /> {client2[2]}</td></tr>
        </table>
      </div>
      <div className="editinfo">
        <h2>Edit Project Details</h2>
          <div className={`formdata ${active==='formdata'?'active':''}`}>
            <div className="formdetails">
              <label>Project Title:</label>
              <input type="text" placeholder="enter project Title" value ={project[0]} readonly />
              <label>Project Description:</label>
              <textarea type="text" placeholder="enter project Description" value={project[1]} readonly/>
              <label>Project Status:</label>
              <select>
                <option readonly>{project[2]}</option>
              </select>
              <label>Select Your Client</label>
              <select>
                <option>{client2[0]}</option>
              </select>
            </div>
          </div>
          <div className={`formdata2 ${active==='formdata2'?'active':''}`}>
            <div className="formdetails">
              <label>Project Title:</label>
              <input type="text" placeholder="enter project Title" name='projecttopic' value={projectdata.projecttopic} onChange={handleproject}/>
              <label>Project Description:</label>
              <textarea type="text" placeholder="enter project Description" name='projectdescription' value={projectdata.projectdescription} onChange={handleproject}/>
              <label>Project Status:</label>
              <select name="projectstatus" onChange={handleproject}>
              <option disable>select status</option>
              <option value="New Project">New Project</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              </select>
              <label>Select Your Client</label>
              <select name="projectclient" onChange={handleproject}>
                <option>select client</option>
                {result.map((re,i)=>(
                    <option key={i} value={re.clientname}>{re.clientname}</option>
                ))}
              </select>
              <button id="Save" onClick={()=>callproject()}>Save</button>
            </div>
          </div>
          <div className="buttons">
            <button id="Edit" onClick={()=>settingedit()}>In Order to Edit data click here </button>
            
            <button id="Delete" onClick={()=>calldelete()}>Delete</button>

          </div>
      </div>
      </div>
    </div>
  )
}

export default project