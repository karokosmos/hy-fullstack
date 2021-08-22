import React from 'react'

const User = ({ name, handleLogout }) => (
  <div>
    {name} logged in
    <button onClick={() => handleLogout()}>logout</button>
  </div>
)

export default User

