const {Router} = require('express');
const route = Router();
const {userdata} = require('../db/database')
const {fetchuser} = require('../middleware/middle')
const {JWT} = require('../config')
const jwt = require('jsonwebtoken')


//--------------------------------------------signup pages------------------------------------------

route.post('/signup',async (req,res)=>{
    const useremail = req.body.useremail;
    const username = req.body.username;
    const userpassword = req.body.userpassword;
    
    const finduser = await userdata.findOne({
        useremail
    })
    if(finduser)
    {
        res.json({
            success:false,
            msg:'user already exist try login'
        })
    }
    else
    {
        const createuser = await userdata.create
        ({
            useremail,
            userpassword,
            username
        })
        if(createuser)
        {
            const token = jwt.sign({
                useremail
            },JWT)

            localStorage.setItem('token1',token)

            res.json
            ({
                success:true,
                msg:'Successfully created account'
            })
        }
        else
        {
            res.json({
                success:false,
                msg:'Something went wrong'
            })
        }
    }
})


//-----------------------------------------end of signup pages--------------------------------------

//------------------------------------------------signin--------------------------------------------

route.post('/signin',async(req,res)=>{
    const useremail = req.body.useremail;
    const userpassword = req.body.userpassword;
    const finduser = await userdata.findOne
    ({
        useremail
    })
    if(finduser)
    {
        const passconn = userpassword === finduser.userpassword
        if(passconn)
        {

            const token = jwt.sign({
            useremail
            },JWT)

            localStorage.setItem('token1',token)

            res.json
            ({
                success:true,
                token
            })
        }
        else
        {
            res.json({
                success:false,
                msg:'Invalid credentials'
            })
        }
    }
    else
    {
        res.json
        ({
            success:false,
            msg:'Invalid credentials'
        })
    }
})


//---------------------------------------------end of signin----------------------------------------



//---------------------------------------------retriving data---------------------------------------

route.get('/getdata',fetchuser,async(req,res)=>{
    const useremail = req.useremail;
    const fetchuserdata = await userdata.findOne({
        useremail
    })
    if(fetchuserdata)
    {
        res.json({
            fetchuserdata
        })   
    }
    else
    {
        res.json({
            success:false,
            msg:'Unable to fetch userdata'
        })
    }
})

//------------------------------------------end of retriving data-----------------------------------



//---------------------------------------------addding client---------------------------------------

route.put('/addclient',fetchuser, async(req,res)=>{
    const useremail = req.useremail;
    const clientemail = req.body.clientemail;    
    const clientname = req.body.clientname;    
    const clientcontactnumber = req.body.clientcontactnumber;
    const findinguser = await userdata.findOne({
        useremail
    })
    if(findinguser)
    {
        const addingclient = await userdata.updateOne(
            {useremail:useremail},
            {
            $push:{client:{clientemail:clientemail,clientname:clientname,clientcontactnumber:clientcontactnumber}}
        })
        if(addingclient)
        {
            res.json
            ({
                success:true,
                msg:'successfully added'
            })
        }
        else
        {
            res.json
            ({
                success:false,
                msg:'Unable to add data '
            })
        }   
    }
    else
    {
        res.json({
            success:false,
            msg:'Unable to find user'
        })
    }
})


//-----------------------------------------end of addding client------------------------------------



//-------------------------------------------deleting client----------------------------------------


route.delete('/deleteclientdata/:id',fetchuser,async(req,res)=>{
    const {id} = req.params;
    const useremail = req.useremail;
    console.log(id)
    const deleteupdate = await userdata.updateOne(
        {useremail:useremail},
        {
        $pull:{client:{_id:id}}
    })
    console.log(deleteupdate)
    if(deleteupdate)
        {
            res.json({
                success:true,
                msg:'Deleted Successfully'
            })
        }
    else
        {
            res.json({
                success:false,
                msg:'Something went wrong'
            })
        }
})


//----------------------------------------end of deleting client------------------------------------



//-------------------------------------------addding projects---------------------------------------

route.put('/addproject',fetchuser, async(req,res)=>{
    const useremail = req.useremail;
    const projecttopic = req.body.projecttopic;
    const projectdescription = req.body.projectdescription;
    const projectstatus = req.body.projectstatus;
    const projectclient = req.body.projectclient;

    const fnduser = await userdata.findOne({
        useremail
    })
    if(fnduser)
    {
        const updateproject = await userdata.updateOne(
            {useremail:useremail},
            {
            $push:{project:{projecttopic:projecttopic,projectdescription:projectdescription,projectstatus:projectstatus,projectclient:projectclient}}
        }) 
        if(updateproject)
        {
            res.json({
                success:true,
                msg:'Successfully updated project data'
            })
        } 
        else
        {
            res.json
            ({
                msg:'Unable to update project data'
            })
        } 
    }
    else
    {
        res.json    
        ({
            msg:'Something went wrong'
        })
    }

})

//-----------------------------------------end of addding project------------------------------------


//-------------------------------------------displaying projects-------------------------------------

route.get('/getproject',fetchuser,async(req,res)=>{
    const useremail = req.useremail;
    const fetchproject =await userdata.findOne({
        useremail
    })
    if(fetchproject)
        {
            res.json({
                fetchproject
            })
        }
    else
    {
        res.json({
            success:false,
            msg:'No data found'
        })
    }
})

//----------------------------------------end of displayimg projects---------------------------------


//-----------------------------------------displaying individual data-------------------------------

route.get('/getprojectdata/:id',fetchuser,async(req,res)=>{
    const useremail = req.useremail;
    const {id} = req.params;
    const dataall = await userdata.findOne(
    {
        'project._id':id
    })

    if(dataall)
    {
        res.json({
            dataall
        })
    }
    else
    {
        res.json({
            msg:'Something went wrong'
        })
    }
})

//---------------------------------------end of displaying individual data--------------------------



//------------------------------------------updating project data-----------------------------------

route.put('/updateproject/:id',fetchuser,async (req,res)=>{
    const {id} = req.params;
    const useremail = req.useremail;
    const projecttopic = req.body.projecttopic;
    const projectdescription = req.body.projectdescription;
    const projectstatus = req.body.projectstatus;
    const projectclient = req.body.projectclient;

    console.log(id)
    const findproject = await userdata.findOneAndUpdate(
        {
            useremail:useremail,
            project:{
                $elemMatch:{
                    _id:id
                },
            },
        },
        {
            $set:{"project.$.projecttopic":projecttopic,"project.$.projectdescription":projectdescription,"project.$.projectstatus":projectstatus,"project.$.projectclient":projectclient}
        },
        )
    console.log(findproject)
    if(findproject)
    {
        res.json({
            success:true,
            msg:'succcessfully updated'
        })
    }
    else
    {
        res.json({
            success:false,
            msg:'something went wrong'
        })
    }
})

//--------------------------------------------end of updating project-------------------------------



//-------------------------------------------delete project----------------------------------------

route.delete('/deleteprojectt/:id',fetchuser,async(req,res)=>{
    const {id} = req.params;
    const useremail = req.useremail;
    console.log(id)
    const deleteupdate = await userdata.updateOne(
        {useremail:useremail},
        {
        $pull:{project:{_id:id}}
    })
    if(deleteupdate)
        {
            res.json({
                success:true,
                msg:'Deleted Successfully'
            })
        }
    else
        {
            res.json({
                success:false,
                msg:'Something went wrong'
            })
        }
})

//-------------------------------------------end of deleting project------------------------------

module.exports = route