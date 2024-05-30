const express = require('express')
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');
const bodyparser = require('body-parser')
const cookieparser = require('cookie-parser')
const userlink = require('./route/route')
const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./token')
app.use(cors());
app.use(cookieparser());
app.use(bodyparser.json())
const port = 4000;
app.use('/user',userlink)
app.listen(4000,()=>
{
    console.log('listening to port ',port)
})
