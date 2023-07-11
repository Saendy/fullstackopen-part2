import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/Persons'

const App = (props) => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  

  useEffect(() => {
    personService.getAll()
      .then(response => {
        setPersons(response.data)
    })
  }, []);


  const changeNameFilter = (event) => {
    setNameFilter(event.target.value);
  }
  const changeNewName = (event) => {
    setNewName(event.target.value);
  }
  const changeNewNumber = (event) => {
    setNewNumber(event.target.value);
  }

  const deleteNumber = (event) => {
    if (window.confirm(`Delete ${persons.find((person) => person.id === parseInt(event.target.value)).name}?`)) {
      personService.remove(event.target.value)
        .then( response => {
          let newPersons = [...persons];
          newPersons.splice(persons.findIndex((person) => person.id === parseInt(event.target.value)), 1)
          setPersons(newPersons)
        })
    }
  }

  const addNewNumber = (event) => {
    event.preventDefault()

    if (persons.findIndex((person) => person.name === newName) >= 0) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService.update(persons[persons.findIndex((person) => person.name === newName)].id, {name: newName, number: newNumber})
          .then ( response => {
            let newPersons = [...persons];
            newPersons[newPersons.findIndex((person) => person.id === response.data.id)].number = response.data.number
            setPersons(newPersons);
          })
      }
    }
    else {
      personService.create({name: newName, number: newNumber})
        .then( response => {
          const newPersons = [...persons];
          newPersons.push(response.data)
          setPersons(newPersons);
        })
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterHandler={changeNameFilter} />
      <h3>Add a new</h3>
      <PersonForm submitHandler={addNewNumber} newNumberHandler={changeNewNumber} newNameHandler={changeNewName} />
      <h2>Numbers</h2>
      <Persons filter={nameFilter} persons={persons} deleteHandler={deleteNumber} />
    </div>
  )
}

export default App