import React, { useContext, useState } from 'react'
import {Contectfile} from '../context/contectfile' 
import './css/loogin.css'
import { Navigate, useNavigate } from 'react-router-dom'

const login = () => {

  const [display,setdisplay] = useState(false)

  const [bactive,setbactive]=useState('signin')


  const {signin,signup} = useContext(Contectfile)


  const displaypassword=()=>
  {
    if(display===false)
      {
        setdisplay(true)
      }
    if(display===true)
      {
        setdisplay(false)
      }
  }

  const handleclick = (name)=>
    {
      setbactive(name);
    }


  //--------------------------------signup process--------------------------

  const [signupdata,setsignupdata] = useState({
    useremail:'',
    username:'',
    userpassword:''
  })

  const handlesignup = (e)=>
    {
      setsignupdata({...signupdata,[e.target.name]:e.target.value})
    }

  const callsignup = async ()=>
    {
      if(signupdata.useremail==='' || signupdata.username==='' || signupdata.userpassword==='')
      {
        alert('Please fill all the required fields') 
      }
      else
      {
        const signupresult = await signup(signupdata)
        setsignupdata({
          useremail:'',
          username:'',
          userpassword:''
        })
        if(signupresult)
          {
            console.log('reached the home page',signupresult)
            navigate('/home')
          }
        else
        {
          console.log('Unable to reach signup page')
        }
      }
    }


    //----------------------------signin------------------------------
    const navigate = useNavigate()

    const [logindetails,setlogindetails] = useState({
      useremail:'',
      userpassword:''
    })

    const handlelogin = (e)=>
      {
        setlogindetails({...logindetails,[e.target.name]:e.target.value})
      }

    const login = async ()=>
      {

        if(logindetails.useremail==='' || logindetails.userpassword==='')
        {
          alert('Please fill out all the details')  
        }
        else
        {
          const loginresult = await signin(logindetails)
          localStorage.setItem('token',loginresult.token)

          setlogindetails({
            useremail:'',
            userpassword:''
          })

          if(loginresult.success)
            {
              console.log("Login success")
              navigate('/home')
            }
          else
          {
            console.log("unsuccessful")
          }
        }
      }


  return (
    <div className='form-main'>
      <div className='heading' id="result">
        <h1>Project Management System</h1>
      </div>
      <div className="formhead">
        <div className="formleft">
          <h1>Welcome Back!!</h1>
          <p>Please enter your details to continue</p>
        </div>
        <div className="formright">
          <div className="togglebutton">
            <div className={`signinbutton ${bactive==='signin'?'activebutton':''}`}>
              <button onClick={()=>handleclick('signin')}>Sign in </button>
            </div>
            <div className={`signinbutton ${bactive==='signup'?'activebutton':''}`}>
              <button onClick={()=>handleclick('signup')}>Sign up </button>
            </div>
          </div>

          {/* SIGNIN DETAILS */}

          <div className={`form-signin ${bactive==='signin'?'detailsactive':''}`}>
            <h1>Sign in</h1>
            <div className="signin-email">
              <label>Email id : </label>
              <input type="text" placeholder='Please enter your Email' name="useremail" value={logindetails.email} onChange={handlelogin}/>
            </div>
            <div className="signin-password">
              <label>Password : </label>
              <div className="displaypass">
              <input type={`${display?'text':'password'}`} placeholder='Please enter your Password' name="userpassword" value={logindetails.userpassword} onChange={handlelogin}/>
              <button onClick={()=>displaypassword(true)}>Show</button>
              </div>
            </div>
            <div className="misc">
            <button onClick={()=>login()}>Sign in</button>
            <p><span>forgot password</span></p>
            </div>
          </div>

          {/* SIGNUP DETAILS */}

          <div className={`form-signup ${bactive==='signup'?'detailsactive':''}`}>
          <h1>Sign up</h1>
            <div className="signup-email">
              <label>Email id : </label>
              <input type="text" placeholder='Please enter your Email' name='useremail' value={signupdata.useremail} onChange={handlesignup}/>
            </div>
            <div className="signup-username">
              <label>Username : </label>
              <input type="text" placeholder='Please enter your Username' name='username' value={signupdata.username} onChange={handlesignup}/>
            </div>
            <div className="signup-password">
              <label>Password : </label>
              <div className="displaypass">
              <input type={`${display?'text':'password'}`} placeholder='Please enter your Password' name='userpassword' value={signupdata.userpassword} onChange={handlesignup}/>
              <button onClick={()=>displaypassword(true)}>Show</button>
              </div>
            </div>
            <div className="signupmisc">
              <button onClick={()=>callsignup()}>Signup</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default login