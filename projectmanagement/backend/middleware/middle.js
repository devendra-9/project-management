const jwt = require('jsonwebtoken')
const {JWT} = require('../config')

const fetchuser = (req,res,next)=>
{
    const token = localStorage.getItem('token1')
    if(token)
    {
        const tokenverify = jwt.verify(token,JWT);
        req.useremail=tokenverify.useremail 
        next();
    }   
    else
    {
        res.json
        ({
            msg:'no token found'
        })
    }
}
module.exports = {fetchuser}