const jwt = require('jsonwebtoken')

const auth = async (req,res,next) =>{
    // Check Header
        const authHeader = req.headers.authorization
        if(!authHeader || !authHeader.startsWith('Bearer')){
            throw new Error('Authentication invalid')
        }
    
        //Splitting the header and bearer keyword and just extracting the token
        const token = authHeader.split(' ')[1]
    
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET)
         //Attach the user to the job routes    
            req.user = {userId:payload.userId, name:payload.name}
            next()
        } catch (error){
            res.send(error)
            throw new Error('Authentication invalid')
            
        }
    
    }
    
    module.exports = auth