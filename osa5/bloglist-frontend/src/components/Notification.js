import React from 'react'

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  const notificationClass = `notification ${notification.type}`

  return (
    <div className={notificationClass}>
      {notification.message}
    </div>
  )
}

export default Notification