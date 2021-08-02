import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState({ text: '', type: '' }) // Message type: error or success

  // Get persons from json-server (once, after initial render)
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(p => p.name === newName)

    if (existingPerson && newNumber) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        return updatePerson(existingPerson.id)
      }
    }

    if (existingPerson) {
      return window.alert(`${newName} is already added to phonebook`)
    }

    addPerson()
  }

  const addPerson = () => {
    const newPerson = {
      name: newName,
      number: newNumber
    }
    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        showNotification({
          text: `Added ${returnedPerson.name}`,
          type: 'success'
        })
      })
      .catch(error => {
        const errorText = error.response.data.message
        showNotification({
          text: errorText,
          type: 'error'
        })
      })
  }

  const updatePerson = (id) => {
    const updatedPerson = {
      name: newName,
      number: newNumber
    }
    personService
      .update(id, updatedPerson)
      .then(returnedPerson => {
        const updatedPersons = persons.map(person =>
          person.id !== id
            ? person
            : returnedPerson
        )
        setPersons(updatedPersons)
        setNewName('')
        setNewNumber('')
        showNotification({
          text: `Changed the number of ${returnedPerson.name}`,
          type: 'success'
        })
      })
      .catch(error => {
        showNotification({
          text: `Information of ${newName} has already been removed from server`,
          type: 'error'
        })
      })
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      const deleteId = person.id

      personService
        .deleteOne(deleteId)
        .then(_ => {
          setPersons(persons.filter(p => p.id !== deleteId))
          showNotification({
            text: `Deleted ${person.name}`,
            type: 'success'
          })
        })
    }
  }

  const showNotification = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage({ text: '', type: '' })
    }, 3000)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = persons.filter((person) => {
    const name = person.name.toLowerCase()
    const number = person.number
    const fil = filter.toLowerCase()
    return name.includes(fil) || number.includes(fil)
  })

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter
        filter={filter}
        handleChange={handleFilterChange} />
      <h2>Add new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons
        persons={personsToShow}
        deletePerson={deletePerson} />
    </div>
  )
}

export default App
