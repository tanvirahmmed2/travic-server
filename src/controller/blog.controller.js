const Blog = require("../model/blog.model")

const getBlog = async (req, res) => {
    try {
        const blogs = await Blog.find({})
        if (!blogs) {
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

module.exports = {
    getBlog
}