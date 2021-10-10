import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data
    case 'LOGOUT_USER':
      return null
    default:
      return state
  }
}

export const initializeUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')

    if (!loggedUserJSON) return

    const user = JSON.parse(loggedUserJSON)
    blogService.setToken(user.token)

    dispatch({
      type: 'SET_USER',
      data: user
    })
  }
}

export const loginUser = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username, password
      })

      // Save logged user to localStorage
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)

      dispatch({
        type: 'SET_USER',
        data: user
      })
    } catch (exception) {
      dispatch(setNotification('wrong username or password', 'error'))
    }
  }
}

export const logoutUser = () => {
  window.localStorage.removeItem('loggedBloglistUser')
  return {
    type: 'LOGOUT_USER'
  }
}

export default userReducer