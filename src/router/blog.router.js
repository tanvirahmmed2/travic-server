const express = require('express')
const { getBlog, newBlog } = require('../controller/blog.controller')

const blogRouter= express.Router()

blogRouter.get('/', getBlog)
blogRouter.post('/new', newBlog)




module.exports= blogRouter