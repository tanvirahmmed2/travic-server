const User = require("../model/user.model")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require("../config/secret")
const Tour = require("../model/tour.model")

const getUser = async (req, res) => {
    try {
        const users = await User.find({}).select('-password')
        if (!users || users.length === 0) {
            return res.status(400).send({
                success: false,
                message: 'No user found'
            });
        }
        return res.status(200).send({
            success: true,
            message: 'Successfully fetched all user data',
            payload: users
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'User fetch Failed'
        })

    }
}


const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Fill all inputs'
            })
        }
        const salt = bcrypt.genSaltSync(10);
        const hashedPass = bcrypt.hashSync(password, salt);
        const newUser = new User({ name, email, password: hashedPass })
        await newUser.save()
        return res.status(200).send({
            success: true,
            message: 'Successfully registered',
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Failed to register'
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email, password) {
            return res.status(400).send({
                success: false,
                message: "Email or Password missing"
            })
        }
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).send({
                success: false,
                message: "No email found with this email"
            })
        }

        const passMatch = await bcrypt.compare(password, user.password)
        if (!passMatch) {
            return res.status(400).send({
                success: false,
                message: "Incorrect password. Try again or reset your password"
            })
        }

        const payload = { id: user._id, role: user.role, email: user.email };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });

        const cookieOptions = {
            httpOnly: true,      // Prevents client-side JS from accessing the cookie
            secure: true,         // Ensures cookie is sent only over HTTPS
            sameSite: "none",     // Required for cross-site cookies (like frontend ↔ backend on different domains)
            maxAge: 1000 * 60 * 60 * 24,
        };

        res.cookie("user_token", token, cookieOptions);

        return res.status(200).send({
            success: false,
            message: "Successfully loged in",
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Failed to login'
        })
    }

}


const savePackage = async (req, res) => {
    try {

        const { id, userId } = req.body
        if (!userId || !id) {
            return res.status(400).send({
                success: false,
                message: 'package info not found'
            });
        }
        const user = await User.findById(userId)
        if (!user) {
            return res.status(400).send({
                success: false,
                message: 'Invalid user id'
            });
        }
        const tour = await Tour.findById(id)
        if (!tour) {
            return res.status(500).send({
                success: false,
                message: 'Tour data not found'
            });
        }
        user.saved.push({ title: tour.title, tourId: tour._id })
        await user.save()
        return res.status(200).send({
            success: true,
            message: 'Successfully saved'
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Failed to save'
        });
    }

}


module.exports = {
    getUser,
    registerUser,
    loginUser,
    savePackage
}