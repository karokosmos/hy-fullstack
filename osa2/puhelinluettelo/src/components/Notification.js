import React from 'react'

const Notification = ({ message }) => {
  if (message.text === '') {
    return null
  }

  const notificationClass = `notification ${message.type}`
  return (
    <div className={notificationClass}>
      {message.text}
    </div>
  )
}

export default Notification