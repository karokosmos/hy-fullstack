import React from 'react'

const Persons = ({ persons, deletePerson }) => (
  <div>
    {persons.map(person =>
      <div key={person.name}>
        <p>{person.name} {person.number}</p>
        <button onClick={() => deletePerson(person)}>X</button>
      </div>
    )}
  </div>
)

export default Persons