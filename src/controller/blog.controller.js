const Blog = require("../model/blog.model")
const cloudinary = require('../config/cloudinary')

const getBlog = async (req, res) => {
    try {
        const blogs = await Blog.find({})
        if (!blogs || blogs.length===0) {
            return res.status(400).send({
                success: false,
                message: 'No blog data found'
            });
        }
        res.status(200).send({
            success: true,
            message: 'Successfully fetched blog data',
            payload: blogs
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Failed to fetch blogs'
        })
    }
}

const newBlog = async (req, res) => {
    try {
        const { title, author, description, tags } = req.body
        if (!title || !author || !description || !tags) {
            return res.status(400).send({
                success: false,
                message: 'Fill all inputs'
            });
        }
        const existBlog = await Blog.findOne({ title })
        if (existBlog) {
            return res.status(400).send({
                success: false,
                message: 'Blog with this title already exists'
            });
        }
        const tagArray = Array.isArray(tags)
            ? tags
            : tags?.split(",").map((t) => t.trim());

        if (!req.file) {
            return res.status(400).send({
                success: false,
                message: 'Please add image'
            });
        }

        const fileStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

        const uploadImage = await cloudinary.uploader.upload(fileStr, { folder: 'blogs' })


        const newBlog = new Blog({
            title,
            description,
            author,
            tags: tagArray,
            image: uploadImage.secure_url,
            imageId: uploadImage.public_id
        });

        await newBlog.save()
        res.status(200).send({
            success: true,
            message: 'Successfully added blog'
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'Failed to add blog data'
        });
    }

}


const removeBlog = async (req, res) => {
    try {
        const { id } = req.body
        if (!id) {
            return res.status(400).send({
                success: false,
                message: 'Blog id not found'
            });
        }
        const blog = await Blog.findById(id)
        if (!blog) {
            return res.status(400).send({
                success: false,
                message: 'No blog found with this id'
            });
        }
        await cloudinary.uploader.destroy(blog.imageId)
        await Blog.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: 'Successfully removed blog'
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Failed to remove blog'
        });
    }

}

module.exports = {
    getBlog,
    newBlog,
    removeBlog
}