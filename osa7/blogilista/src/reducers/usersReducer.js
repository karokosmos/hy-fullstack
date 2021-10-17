import usersService from '../services/users'

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.data
    default:
      return state
  }
}

export const initializeAllUsers = () => {
  return async dispatch => {
    const allUsers = await usersService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: allUsers
    })
  }
}

export default usersReducer