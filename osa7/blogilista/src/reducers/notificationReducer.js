const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return {
        message: action.data.message,
        type: action.data.messageType
      }
    case 'HIDE_NOTIFICATION':
      return null
    default:
      return state
  }
}

let timeoutID = undefined

export const setNotification = (message, messageType = 'success') => {
  return dispatch => {
    dispatch(showNotification(message, messageType))

    const milliseconds = 5000

    if (timeoutID) {
      clearTimeout(timeoutID)
    }

    timeoutID = setTimeout(() => {
      dispatch(hideNotification())
      timeoutID = undefined
    }, milliseconds)
  }
}

const showNotification = (message, messageType) => {
  return {
    type: 'SHOW_NOTIFICATION',
    data: {
      message,
      messageType
    }
  }
}

const hideNotification = () => (
  {
    type: 'HIDE_NOTIFICATION'
  }
)

export default notificationReducer