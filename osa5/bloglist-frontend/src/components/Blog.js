import React, { useState } from 'react'

const Blog = ({ blog, user, updateLikes, deleteBlog }) => {
  const [showInfo, setShowInfo] = useState(false)

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
              <button onClick={() => deleteBlog(blog.id)}>remove</button>}

          </div>}

      </div>
      <button className="blog-btn" onClick={() => setShowInfo(!showInfo)}>
        {showInfo ? 'hide' : 'view'}
      </button>
    </div>
  )
}

export default Blog