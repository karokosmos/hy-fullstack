import React from 'react'

const PersonForm = (props) => {
  const { newName, newNumber, handleSubmit, handleNameChange, handleNumberChange } = props

  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input onChange={handleNameChange} value={newName} />
      </div>
      <div>
        number: <input onChange={handleNumberChange} value={newNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm