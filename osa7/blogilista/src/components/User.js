import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'

const User = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  return (
    <div>
      {user.name} logged in
      <button onClick={() => dispatch(logoutUser())}>logout</button>
    </div>
  )
}

export default User

