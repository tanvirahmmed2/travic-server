const User = require("../model/user.model")

const getUser= async(req,res)=>{
    try {
        const users= await User.find({}).select('-password')
        if(!users){
            return res.status(400).send({ 
                success: false,
                message: 'No user found' 
            });
        }
        res.status(200).send({ 
                success: false,
                message: 'Successfully fetched all user data',
                payload: users 
            });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'User fetch Failed'
        })
        
    }
}



module.exports={
    getUser
}