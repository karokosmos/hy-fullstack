import React, { useState, useEffect, useRef } from 'react'
import './index.css'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import User from './components/User'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const blogFormRef = useRef()

  // Get blogs from server
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  // Get logged user (if there is one)
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      // Save logged user to localStorage
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      showNotification('wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }

  const addBlog = (title, author, url) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create({ title, author, url })
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        showNotification(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      })
  }

  const deleteBlog = (id) => {
    const blog = blogs.find(b => b.id === id)

    // Confirm deletion
    if (!window.confirm(`Do you really want to remove ${blog.title} by ${blog.author}?`)) { return }

    blogService
      .deleteObj(id)
      .then(() => {
        setBlogs(blogs.filter(b => b.id !== id))
        showNotification(`${blog.title} by ${blog.author} deleted`)
      })
  }

  const addLike = (id) => {
    const blog = blogs.find(b => b.id === id)
    const updatedBlog = { ...blog, likes: blog.likes + 1 }

    blogService
      .update(id, updatedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
  }

  if (user === null) {
    return (
      <div>
        <Notification notification={notification} />
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword} />
      </div>
    )
  }

  return (
    <div>
      <Notification notification={notification} />
      <h2>Blogs</h2>
      <User name={user.name} handleLogout={handleLogout} />
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <BlogList
        blogs={blogs}
        updateLikes={addLike}
        deleteBlog={deleteBlog}
        user={user} />
    </div>
  )
}

export default App