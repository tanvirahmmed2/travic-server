const Message = require("../model/message.model");

const getMessage = async (req, res) => {
    try {
        const messages = await Message.find({})
        if (!messages) {
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

const newMessage = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body
        if (!name || !email || !subject || !message) {
            return res.status(400).send({
                success: false,
                message: 'Fill all field'
            });
        }
        const newMessage = new Message({ name, email, subject, message })
        await newMessage.save()
        res.status(200).send({
            success: true,
            message: `Thank you ${name} fro messaging`
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Operation failed'
        })
    }
}

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
            success: false,
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