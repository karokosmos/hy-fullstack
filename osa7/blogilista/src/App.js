import React, { useEffect, useRef } from 'react'
import './index.css'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'
import UserInfo from './components/UserInfo'
import Blog from './components/Blog'
import Navigation from './components/Navigation'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'
import { initializeAllUsers } from './reducers/usersReducer'
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

const App = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  useEffect(() => {
    dispatch(initializeAllUsers())
  }, [])

  const toggleVisibility = () => {
    blogFormRef.current.toggleVisibility()
  }

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <Router>
      <Container>
        <Navigation />
        <Notification />

        <Typography variant="h4" component="div" pt={2} pb={2}>
          Blogs
        </Typography>

        <Switch>
          <Route path='/users/:id'>
            <UserInfo />
          </Route>
          <Route path='/users'>
            <Users />
          </Route>
          <Route path='/blogs/:id'>
            <Blog />
          </Route>
          <Route path='/'>
            <Togglable buttonLabel='create new blog' ref={blogFormRef}>
              <BlogForm toggleVisibility={toggleVisibility} />
            </Togglable>
            <BlogList />
          </Route>
        </Switch>
      </Container>
    </Router>
  )
}

export default App