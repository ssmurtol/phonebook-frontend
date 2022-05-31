// Korjattu edellisen osion mallivastauksen pohjalta 
// henkilön poistaminen axioksen vastuulle ja 
// personAlreadyExist-funktio toimimaan oikein.


import { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handlePersonSubmit = (event) => {
    console.log(event.target.value)
    event.preventDefault()

    const nameObject = {
      name: newName,
      number: newNumber
    }

    const personAlreadyExists = persons.find(person => person.name
      === nameObject.name)

    if (personAlreadyExists)  {
      alert(`${newName} is already added to phonebook`)
      return
    }
      personService
      .create(nameObject)
      .then(returnedName => {
        setPersons(persons.concat(returnedName))
        setNewName('')
        setNewNumber('')
      })
  }

  const handlePersonChange = (event) => {
    return (
    setNewName(event.target.value))
  }

  const handleNumberChange = (event) => {
    return (
    setNewNumber(event.target.value))
  }

  const removePerson = (id) => { 
    const toRemove = persons.find(person => person.id === id)
    const confirmed = window.confirm(`Delete ${toRemove.name}`)
    if (confirmed) {
      personService.remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })  
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handlePersonSubmit}>
        <div>
          name: <input value= {newName}
          onChange={handlePersonChange}/>
        </div>
        <div>
          number: <input value= {newNumber}
          onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <div> {persons.map(person =>
         <p key={person.id}>{person.name} {person.number} 
         <button onClick={() => removePerson(person.id)}>delete</button>
         </p>)}
        </div>
      </div>
  )

}

export default App