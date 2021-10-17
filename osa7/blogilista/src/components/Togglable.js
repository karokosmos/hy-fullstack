import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <Box style={hideWhenVisible} mb={3}>
        <Button variant="contained" color="secondary" onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </Box>
      <Box style={showWhenVisible} sx={{ width: '50ch' }} pb={2}>
        {props.children}
        <Button onClick={toggleVisibility} variant="outlined">cancel</Button>
      </Box>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable