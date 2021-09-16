const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.message
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const setNotification = (message, seconds) => {
  return dispatch => {
    dispatch(showNotification(message))

    const milliseconds = parseInt(`${seconds}000`)

    setTimeout(() => {
      dispatch(clearNotification())
    }, milliseconds)
  }
}

const showNotification = (message) => {
  return {
    type: 'SET_NOTIFICATION',
    message
  }
}

const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

export default notificationReducer