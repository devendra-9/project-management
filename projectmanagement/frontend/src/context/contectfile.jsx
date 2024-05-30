import { Children, createContext, useState } from "react";

export const Contectfile = createContext(null)

const Contectfileprovider = (props)=>
{
    const [result,setresult] = useState([])

    const signin = async(signindata)=>
    {
        let loginresult;
        await fetch('http://localhost:4000/user/signin',{
            method:'POST',
            headers:
            {
                Accept:'application/form-data',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(signindata)
        })
        .then((Response)=>Response.json())
        .then((data)=>{
            loginresult = data;
        })
        return loginresult
    }
    const signup = async(signupdata)=>
        {
            let msg='';
            await fetch('http://localhost:4000/user/signup',{
                method:'POST',
                headers:
                {
                    Accept:'application/form-data',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(signupdata)
            })
            .then((response)=>response.json())
            .then((data)=>
            {
                msg = data.msg
            })
            return msg
        }
        const addclientdata = async(clientdata) =>
            {
                let clientresult;
                await fetch('http://localhost:4000/user/addclient',{
                    method:'PUT',
                    headers:
                    {
                        Accept:'application/form-data',
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(clientdata)
                })
                .then((response)=>response.json())
                .then((data)=>
                {
                    clientresult=data
                })
                return clientresult
            }
        const addprojectdata = async(projectdata)=>
            {
                let projectresult;
                await fetch('http://localhost:4000/user/addproject',{
                    method:'PUT',
                    headers:
                    {
                        Accept:'application/form-data',
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(projectdata)
                })
                .then((response)=>response.json())
                .then((data)=>
                {
                    projectresult=data;
                })
                    return projectresult
            }

        const deleteclient = async(id) =>
            {
                await fetch('http://localhost:4000/user/deleteclientdata/'+id,{
                    method:'DELETE',
                })
                .then((response)=>response.json())
                .then((data)=>{
                    if(data.success)
                        {
                            console.log('deleted successfully')
                        }
                        else
                        {
                            console.log('something went wrong')
                        }
                })
            }


        const updatepro = async(id,projectdata) =>
            {
                await fetch('http://localhost:4000/user/updateproject/'+id,{
                method:'PUT',
                headers:
                {
                    Accept:'application/form-data',
                    'Content-Type':'application/json'
                },
                    body:JSON.stringify(projectdata)
                })
                .then((response)=>response.json())
                .then((data)=>{
                    if(data.success)
                    {
                        alert("Data updated successfully")
                        return true
                    }
                    else
                    {
                        alert("Something went wrong")
                    }
                })
            }

      
        const deleteproject = async (id)=>
            {
                await fetch('http://localhost:4000/user/deleteprojectt/'+id,{
                    method:'DELETE'
                })
                .then((response)=>response.json())
                .then((data)=>
                {
                    if(data.success)
                    {
                        return true
                    }
                    else
                    {
                        return false
                    }
                })
            }

            

    const contextvalue = {signin,signup,addclientdata,addprojectdata,deleteclient,updatepro,deleteproject}
    return(

        <Contectfile.Provider value={contextvalue}>
            {props.children}
        </Contectfile.Provider>
    )
}

export default Contectfileprovider;