const mongoose = require('mongoose')

const url = 'mongodb+srv://admin:admin123@cluster0.cxvzrpo.mongodb.net/demo'

const isconn = mongoose.connect(url);
if(isconn)
{
    console.log('Connection Successful')    
}

const Userschema = new mongoose.Schema 
({
    username:'String',
    useremail:'String',
    userpassword:'String',
    client:[{
        clientname:'String',
        clientemail:'String',
        clientcontactnumber:'String'
    }],
    project:
    [{
        projecttopic:'String',
        projectdescription:'String',
        projectstatus:'String',
        projectclient:'String'
    }]
})

const userdata = mongoose.model('userdata',Userschema)

module.exports = {userdata}