import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, addLike } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog }) => {
  const [showInfo, setShowInfo] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const removeBlog = (blog) => {
    const id = blog.id

    if (!window.confirm(`Do you really want to remove ${blog.title} by ${blog.author}?`)) { return }

    dispatch(deleteBlog(id))
    dispatch(setNotification(`${blog.title} by ${blog.author} deleted`))
  }

  const updateLikes = (id) => {
    dispatch(addLike(id))
    dispatch(setNotification(`${blog.title} by ${blog.author} liked`))
  }

  return (
    <div className="blog">
      <div className="blog-info">
        {blog.title} by {blog.author}

        {showInfo &&

          <div>
            <p>{blog.url}</p>
            <div className="blog-likes">
              <p>{blog.likes}</p>
              <button onClick={() => updateLikes(blog.id)}>like</button>
            </div>
            <p>{blog.user.name}</p>

            {user.name === blog.user.name &&
              <button onClick={() => removeBlog(blog)}>remove</button>}

          </div>}

      </div>
      <button className="blog-btn" onClick={() => setShowInfo(!showInfo)}>
        {showInfo ? 'hide' : 'view'}
      </button>
    </div>
  )
}

export default Blog