import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const User = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  return (
    <Box sx={{
      display: 'flex',
      flexGrow: 1,
      justifyContent: 'flex-end',
      alignItems: 'center'
    }}>
      <Typography variant="subtitle2" component="div" mr={1}>
        {user.name} logged in
      </Typography>
      <Button size="small" color="inherit" variant="outlined" onClick={() => dispatch(logoutUser())}>logout</Button>
    </Box>
  )
}

export default User

