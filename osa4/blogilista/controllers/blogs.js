const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')
const userExtractor = require('../utils/middleware').userExtractor

/*********************/
// GET
/*********************/
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', {
      username: 1, name: 1, id: 1
    })

  response.json(blogs)
})

/*********************/
// POST
/*********************/
blogsRouter.post('/', userExtractor, async (request, response, next) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()

  // Add blogs id to the user document
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog.toJSON())
})

/*********************/
// DELETE
/*********************/
blogsRouter.delete('/:id', userExtractor, async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  const userId = request.user.id

  // Throw error if user ids don't match
  if (blog.user.toString() !== userId) {
    return response.status(401).json({ error: 'user is not authorized to delete this blog' })
  }

  // If everything is ok, remove blog from database
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', userExtractor, async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

  response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter