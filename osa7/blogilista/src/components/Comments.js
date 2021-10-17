import React from 'react'
import { useState } from 'react'
import { addComment } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const Comments = ({ blog }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const addNewComment = (e) => {
    e.preventDefault()
    dispatch(addComment({ comment }, blog.id))
    setComment('')
  }

  return (
    <div>
      <h4>Comments</h4>
      <form onSubmit={addNewComment}>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit">add comment</button>
      </form>
      {blog.comments.length === 0 && <p>No comments yet</p>}
      <ul>
        {blog.comments.map(comment =>
          <li key={comment.id}>
            {comment.comment}
          </li>
        )}
      </ul>
    </div>
  )
}

export default Comments