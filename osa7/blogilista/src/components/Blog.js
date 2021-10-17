import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, addLike } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useParams } from 'react-router'
import Comments from './Comments'

const Blog = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const { id } = useParams()
  const blog = blogs.find(b => b.id === id)

  const removeBlog = () => {
    if (!window.confirm(`Do you really want to remove ${blog.title} by ${blog.author}?`)) { return }

    dispatch(deleteBlog(id))
    dispatch(setNotification(`${blog.title} by ${blog.author} deleted`))
  }

  const updateLikes = () => {
    dispatch(addLike(id))
    dispatch(setNotification(`${blog.title} by ${blog.author} liked`))
  }

  if (!blog) {
    return null
  }

  return (
    <div className="blog">
      <h3>{blog.title} by {blog.author}</h3>
      <p>{blog.url}</p>
      <div className="blog-likes">
        <p>{blog.likes}</p>
        <button onClick={() => updateLikes()}>like</button>
      </div>
      <p>added by {blog.user.name}</p>

      {user.name === blog.user.name &&
        <button onClick={() => removeBlog()}>remove</button>}

      <Comments blog={blog} />
    </div>
  )
}

export default Blog