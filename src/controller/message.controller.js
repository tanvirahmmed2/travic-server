const Message = require("../model/message.model");

const getMessage = async (req, res) => {
    try {
        const messages = await Message.find({})
        if (!messages || messages.length===0) {
            return res.status(400).send({
                success: false,
                message: 'No message found'
            });
        }
        res.status(200).send({
            success: true,
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

const newMessage = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).send({
                success: false,
                message: 'Please fill all fields'
            });
        }

        const messageDoc = new Message({ name, email, message });
        await messageDoc.save();

        res.status(201).send({
            success: true,
            message: `Thank you ${name}, your message has been received`
        });

    } catch (error) {
        console.error("Error saving message:", error);
        res.status(500).send({
            success: false,
            message: 'Operation failed',
            error: error.message
        });
    }
};

const removeMessage = async (req, res) => {
    try {
        const { id } = req.body
        if (!id) {
            return res.status(400).send({
                success: false,
                message: 'Message id not found'
            });
        }
        const message = await Message.findById(id)
        if (!message) {
            return res.status(400).send({
                success: false,
                message: 'Message not found'
            });
        }
        await Message.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: 'Successfully deleted message'
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Failed to remove message'
        })
    }
}



module.exports = {
    getMessage,
    removeMessage,
    newMessage
}