import React from 'react'

const Filter = ({ filter, handleChange }) => (
  <div>
    filter shown with <input onChange={handleChange} value={filter} />
  </div>
)

export default Filter