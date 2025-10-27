const express = require('express')
const { getBlog } = require('../controller/blog.controller')

const blogRouter= express.Router()

blogRouter.get('/', getBlog)




module.exports= blogRouter