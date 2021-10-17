import blogService from '../services/blogs'
import commentService from '../services/comments'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'CREATE_BLOG':
      return [...state, action.data]
    case 'DELETE_BLOG': {
      const blogID = action.data
      const updatedState = state.filter(b => b.id !== blogID)
      return updatedState
    }
    case 'ADD_LIKE': {
      const updatedBlog = action.data.updatedBlog
      const id = action.data.id
      const updatedState = state.map(b =>
        b.id !== id ? b : updatedBlog)
      const sortedBlogs = updatedState.sort((a, b) => b.likes - a.likes)
      return sortedBlogs
    }
    case 'ADD_COMMENT': {
      const blogId = action.data.blogId
      const comment = action.data.comment
      const blog = state.find(b => b.id === blogId)
      console.log(blog)
      const updatedBlog = {
        ...blog,
        comments: blog.comments.concat(comment)
      }
      console.log(updatedBlog)
      const updatedState = state.map(b =>
        b.id !== blogId ? b : updatedBlog)
      return updatedState
    }
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
    dispatch({
      type: 'INIT_BLOGS',
      data: sortedBlogs
    })
  }
}

export const createBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'CREATE_BLOG',
      data: newBlog
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.deleteObj(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: id
    })
  }
}

export const addLike = (id) => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    const blog = blogs.find(b => b.id === id)
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    const updatedBlog = await blogService.update(id, likedBlog)

    dispatch({
      type: 'ADD_LIKE',
      data: {
        id,
        updatedBlog
      }
    })
  }
}

export const addComment = (content, blogId) => {
  return async dispatch => {
    const newComment = await commentService.create(content, blogId)
    console.log(newComment)
    dispatch({
      type: 'ADD_COMMENT',
      data: {
        comment: newComment,
        blogId
      }
    })
  }
}

export default blogReducer