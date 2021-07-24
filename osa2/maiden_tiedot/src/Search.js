import React from 'react'

const Search = ({ filter, handleChange }) => (
  <div>
    find countries <input onChange={handleChange} value={filter} />
  </div>
)

export default Search