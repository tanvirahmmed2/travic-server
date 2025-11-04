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
        const existUser = await User.findOne({ email })
        if (existUser) {
            return res.status(400).send({
                success: false,
                message: 'user already exist'
            })
        }
        if (password.length < 6) {
            return res.status(400).send({
                success: false,
                message: 'password must contain atleast 6 character'
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
        if (!email && !password) {
            return res.status(400).send({
                success: false,
                message: "Email or Password missing"
            })
        }
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).send({
                success: false,
                message: "Enter a valid email"
            })
        }

        const passMatch = await bcrypt.compare(password, user.password)
        if (!passMatch) {
            return res.status(400).send({
                success: false,
                message: "Incorrect password"
            })
        }

        const payload = { id: user._id, role: user.role, email: user.email };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });

        const cookieOptions = {
            httpOnly: true,      // Prevents client-side JS from accessing the cookie
            secure: false,         // Ensures cookie is sent only over HTTPS
            sameSite: "lax",     // Required for cross-site cookies (like frontend ↔ backend on different domains)
            maxAge: 1000 * 60 * 60 * 24,
        };

        res.cookie("user_token", token, cookieOptions);

        return res.status(200).send({
            success: true,
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


const protectedUser = async (req, res) => {
    try {
        const token = req.cookies.user_token
        if (!token) {
            return res.status(400).send({
                success: false,
                message: 'Token not found please login'
            });
        }
        const decoded = await jwt.verify(token, JWT_SECRET)
        if (!decoded) {
            return res.status(400).send({
                success: false,
                message: 'invalid token'
            });
        }
        const user = await User.findById(decoded.id)
        if (!user) {
            return res.status(400).send({
                success: false,
                message: 'in valid user'
            });
        }
        return res.status(200).send({
            success: true,
            payload: user
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'User not logged in, please login'
        });

    }
}

const logoutUser = async (req, res) => {
    try {
        const token = req.cookies.user_token
        if (!token) {
            return res.status(400).send({
                success: false,
                message: 'User already logged out'
            });
        }
        res.clearCookie("user_token", {
            httpOnly: true,      // Prevents client-side JS from accessing the cookie
            secure: false,         // Ensures cookie is sent only over HTTPS
            sameSite: "lax", //none for https and lax for local host
            path: "/",
        })
        return res.status(200).send({
            success: true,
            message: "Successfully logged out"
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Failed to log out'
        });
    }
}


const updateProfile = async (req, res) => {
    try {
        const { name, phone, address, } = req.body
        
        const user = await User.findById(req.user._id)
        if (!user) {
            return res.status(400).send({
                success: false,
                message: 'user not found'
            })
        }

        user.name = name
        user.phone = phone
        user.address = address
        await user.save()
        return res.status(200).send({
            success: true,
            message: 'successfully upadted profile'
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'server error',
            error: error.message
        })
    }

}

module.exports = {
    getUser,
    registerUser,
    loginUser,
    savePackage,
    protectedUser,
    updateProfile,
    logoutUser
}