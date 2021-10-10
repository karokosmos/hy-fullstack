import blogService from '../services/blogs'

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

export default blogReducer