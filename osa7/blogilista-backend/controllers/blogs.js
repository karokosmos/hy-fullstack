const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')
const logger = require('../utils/logger')
const userExtractor = require('../utils/middleware').userExtractor

/*********************/
// GET
/*********************/
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', {
      username: 1, name: 1, id: 1
    })
    .populate('comments', {
      comment: 1, id: 1
    })

  response.json(blogs)
})

blogsRouter.get('/comments', async (request, response) => {
  const comments = await Comment
    .find({}).populate('blog', {
      title: 1, author: 1, id: 1
    })

  response.json(comments)
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

  const newBlog = await Blog.findById(savedBlog._id).populate('user', {
    username: 1, name: 1, id: 1
  })

  response.status(201).json(newBlog.toJSON())
})

blogsRouter.post('/:id/comments', async (request, response, next) => {
  const body = request.body
  const blogId = request.params.id

  const comment = new Comment({
    comment: body.comment,
    blog: blogId
  })

  const savedComment = await comment.save()

  const blog = await Blog.findById(blogId)
  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()

  response.status(201).json(savedComment.toJSON())
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

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  console.log(body)

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user.id
  }

  const updatedBlog = await Blog
    .findByIdAndUpdate(request.params.id, blog, { new: true })
    .populate('user', {
      username: 1, name: 1, id: 1
    })
    .populate('comments', {
      comment: 1, id: 1
    })

  response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter