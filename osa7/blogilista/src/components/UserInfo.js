/* eslint-disable no-undef */
import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const UserInfo = () => {
  const users = useSelector(state => state.users)
  const { id } = useParams()
  const user = users.find(u => u.id === id)

  if (!user) {
    return null
  }

  if (user.blogs.length === 0) {
    return (
      <div>
        <h2>{user.name}</h2>
        <h3>No added blogs yet</h3>
      </div>
    )
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </div>
  )
}

export default UserInfo