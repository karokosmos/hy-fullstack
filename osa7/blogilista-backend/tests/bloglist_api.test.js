const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const Blog = require('../models/blog')
const User = require('../models/user')

let initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5
  }
]

let token = null

beforeEach(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})

  // Create test user
  const user = {
    username: 'testUser',
    password: 'salaisuus'
  }

  const userResponse = await api
    .post('/api/users')
    .send(user)

  // Login test user
  const loginResponse = await api
    .post('/api/login')
    .send(user)

  token = loginResponse.body.token

  // Add initial blogs with user id
  initialBlogs[0].user = userResponse.body.id
  initialBlogs[1].user = userResponse.body.id

  await Blog.insertMany(initialBlogs)
})

describe('when there are initially saved blogs', () => {
  test('every blog in db is returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('blogs have a property called id', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]
    expect(blog.id).toBeDefined()
  })
})

describe('adding a new blog', () => {
  test('you can add a blog', async () => {
    const newBlog = {
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)

    const blogsAtEnd = await Blog.find({})
    expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)
  })

  test('if likes property is undefined, likes get a value of 0', async () => {
    const newBlog = {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html"
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)

    expect(response.body.likes).toBe(0)
  })

  test('if title and/or url are not provided, status is 400', async () => {
    const newBlog = {
      author: "John Snow"
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })
})

describe('deletion of a blog', () => {
  test('blog can be deleted', async () => {
    const allBlogs = await Blog.find({})
    const firstBlogId = allBlogs[0].id

    await api
      .delete(`/api/blogs/${firstBlogId}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)
  })
})

describe('updating a blog', () => {
  test('blog can be updated', async () => {
    const allBlogs = await Blog.find({})
    const firstBlogId = allBlogs[0].id

    const updatedBlog = {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 20
    }

    const response = await api
      .put(`/api/blogs/${firstBlogId}`)
      .set('Authorization', `bearer ${token}`)
      .send(updatedBlog)
      .expect(200)
  })
})

describe('when there is initially one user', () => {
  test('creation fails if username is not unique', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: "testUser",
      password: "bananapancake"
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await User.find({})
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails if username is not valid', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: "hi",
      password: "bananapancake"
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('is shorter than the minimum allowed length (3)')

    const usersAtEnd = await User.find({})
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails if password is too short', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: "banana",
      password: "a"
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password must have at least 3 characters')

    const usersAtEnd = await User.find({})
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails if password is missing', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: "banana"
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password missing')

    const usersAtEnd = await User.find({})
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})