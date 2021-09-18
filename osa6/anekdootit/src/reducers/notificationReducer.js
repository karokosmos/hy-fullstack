const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.message
    case 'HIDE_NOTIFICATION':
      return null
    default:
      return state
  }
}

let timeoutID = undefined

export const setNotification = (message, seconds) => {
  return dispatch => {
    dispatch(showNotification(message))

    const milliseconds = parseInt(`${seconds}000`)

    if (timeoutID) {
      clearTimeout(timeoutID)
    }

    timeoutID = setTimeout(() => {
      dispatch(hideNotification())
      timeoutID = undefined
    }, milliseconds)
  }
}

const showNotification = (message) => {
  return {
    type: 'SET_NOTIFICATION',
    message
  }
}

const hideNotification = () => {
  return {
    type: 'HIDE_NOTIFICATION'
  }
}

export default notificationReducer