const Message = require("../model/message.model")

const getMessage=async(req,res)=>{
    try {
        const messages= await Message.find({})
        if(!messages){
            return res.status(400).send({ 
                success: false,
                message: 'No message found' 
            });
        }
        res.status(200).send({ 
                success: false,
                message: 'Successfully found messages',
                payload: messages 
            });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Could not fetch messages'
        })
    }
}

module.exports={
    getMessage
}