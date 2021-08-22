import React from 'react'

const BlogForm = ({ addNewBlog, setNewBlog, newBlog }) => {
  const handleChange = event => {
    const { name, value } = event.target
    setNewBlog(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addNewBlog}>
        <div>
          title:
          <input
            type="text"
            value={newBlog.title}
            name="title"
            onChange={handleChange}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={newBlog.author}
            name="author"
            onChange={handleChange}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={newBlog.url}
            name="url"
            onChange={handleChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm