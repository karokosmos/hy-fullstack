import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

const BlogForm = ({ toggleVisibility }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()
    toggleVisibility()
    dispatch(createBlog({ title, author, url }))
    dispatch(setNotification(`a new blog ${title} by ${author} added`))
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <Typography variant="h6" pb={2}>Create new</Typography>
      <Box
        onSubmit={addBlog}
        component="form"
        sx={{
          '& > :not(style)': { mb: 1, width: '50ch' },
          display: 'flex',
          flexDirection: 'column'
        }}>
        <TextField
          label="title"
          size="small"
          id="title"
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
        <TextField
          label="author"
          size="small"
          id="author"
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
        <TextField
          label="url"
          size="small"
          id="url"
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
        <Button type="submit" className="create-button" variant="contained">create</Button>
      </Box>
    </div>
  )
}

export default BlogForm