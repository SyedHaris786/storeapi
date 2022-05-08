const { pool } = require('../db/connect');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { CommandCompleteMessage } = require('pg-protocol/dist/messages');

// Registration code
const register = async (req,res) =>{
   
 let  {username, email, password} = req.body;

  
  if (!username || !email || !password){
    res.send({message:'Please enter all values'});
  }
  
  if (password.length < 5){
    res.send({message:'Please enter a strong password'});
  } 

  const hashedPassword = await bcrypt.hash(password,5);
  
  console.log({username, email, hashedPassword});

  await pool.query(`SELECT * FROM users WHERE email = '${email}'`, (err,result)=>{
    //Proper error handlling needs to be added 
    if (err) {
      console.log(err)
    }

    if (result.rows.length>0){
      res.send('Email Already Exist');
    }
  });       
    
  await pool.query(`insert into users (username,email, password) values ('${username}','${email}', '${hashedPassword}');`);         
  res.send("User added successfully")
      
}

//Login code
const login = async  (req,res)=> {
  const {email, password} = req.body;

const enteredPassword = await pool.query (`SELECT username, password FROM users where email = $1;`,[email],(err,result)=> {

  try {
  
  if(result.rows.length===0){
  res.send('Please enter a valid password')
  } else {

    const validPass = result.rows[0].password;
    
    bcrypt.compare(password,validPass,(err,isMatch)=>{
      if (err) {
        console.log(err);
      }

      if (isMatch) {
    const username = result.rows[0].username;
    
    const jawt = jwt.sign({'username':username},process.env.JWT_SECRET,{
          expiresIn:'30d',
      })

      res.status(200).json({'token':jawt});
      
      } else {
        //password is incorrect
        console.log("Password is incorrect");
      }

    });
  }

  } catch(error){

    console.log(err);
  }

});

}




module.exports = {login, register}