import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, user, updateLikes, deleteBlog }) => {
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div className="blog-list">
      <br />
      {sortedBlogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          updateLikes={updateLikes}
          deleteBlog={deleteBlog}
        />
      )}
    </div>
  )
}

export default BlogList