require('dotenv').config();
const express = require('express');
const app = express();


const adminroutes = require('./routes/adminroutes')
const userroutes = require('./routes/userroutes')


//Json Middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//Middleware import
const authenticateUser = require("./Middleware/authValidation")

//Router 
const loginRouter  = require("./routes/login")

//login and register
app.use('/api/v1', loginRouter)

//Admin Routes
app.use('/api/v1',authenticateUser,adminroutes);

//Application Routes
app.use('/api/v1',authenticateUser,userroutes);


const port = 5000;

app.listen(port, ()=>{
    console.log(`Server listening on ${port}`)
})
