const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/secret')
const User = require('../model/user.model')




const isLogin = async (req, res, next) => {
    try {
        const token = req.cookies.user_token
        if (!token) {
            return res.status(400).send({
                success: false,
                message: " please login"
            })
        }
        const decoded = await jwt.verify(token, JWT_SECRET)
        if (!decoded) {
            return res.status(400).send({
                success: false,
                message: "Invalid token"
            })
        }
        const user = await User.findById(decoded.id)
        if (!user) {
            return res.status(400).send({
                success: false,
                message: "User not valid"
            })
        }
        req.user = user
        next()

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Failed to athenticate user"
        })

    }
}

const isAdmin = async (req, res, next) => {
    try {
        const user = req.user
        if (!user) {
            return res.status(200).send({
                success: false,
                message: "User not found, please login"
            })
        }
        if (user.role !== 'admin') {
            return res.status(400).send({
                success: false,
                message: "You are not an admin"
            })
        }

        next()

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Failed to athenticate admin"
        })
    }
}

module.exports = {
    isLogin,
    isAdmin
}