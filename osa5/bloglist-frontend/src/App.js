import React, { useState, useEffect } from 'react'
import './index.css'
import blogService from './services/blogs'
import loginService from './services/login'
import Login from './components/Login'
import BlogList from './components/BlogList'
import User from './components/User'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [newBlog, setNewBlog] = useState({
    title: '', author: '', url: ''
  })

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

  const addNewBlog = (event) => {
    event.preventDefault()
    blogService
      .create(newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlog({ title: '', author: '', url: '' })
        showNotification(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      })
  }

  if (user === null) {
    return (
      <div>
        <Notification notification={notification} />
        <Login
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
      <BlogForm
        addNewBlog={addNewBlog}
        newBlog={newBlog}
        setNewBlog={setNewBlog} />
      <BlogList blogs={blogs} />
    </div>
  )
}

export default App