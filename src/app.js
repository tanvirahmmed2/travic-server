const express= require('express')
const cors= require('cors')
const cookieParser= require('cookie-parser')
const userRouter = require('./router/user.router')
const tourRouter = require('./router/tour.router')
const messageRouter = require('./router/message.router')
const blogRouter = require('./router/blog.router')


const app= express()


app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(cookieParser())

app.get('/api', (req,res)=>{
    return res.status(200).send({
        success: true,
        message: 'Server is running'
    })
})


app.use('/api/user', userRouter)
app.use('/api/message', messageRouter)
app.use('/api/tour', tourRouter)
app.use('/api/blog', blogRouter)




module.exports = app