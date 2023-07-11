import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  
  const changeNameFilter = (event) => {
    setNameFilter(event.target.value);
  }
  const changeNewName = (event) => {
    setNewName(event.target.value);
  }
  const changeNewNumber = (event) => {
    setNewNumber(event.target.value);
  }
  const addNewNumber = (event) => {
    event.preventDefault()

    if (persons.findIndex((person) => person.name === newName) >= 0) {
      alert(`${newName} is already added to phonebook`);
    }
    else {
      let newPersons = [...persons];
      newPersons.push({name: newName, number: newNumber, id: persons.length + 1})
      setPersons(newPersons);
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterHandler={changeNameFilter} />
      <h3>Add a new</h3>
      <PersonForm submitHandler={addNewNumber} newNumberHandler={changeNewNumber} newNameHandler={changeNewName} />
      <h2>Numbers</h2>
      <Persons filter={nameFilter} persons={persons} />
    </div>
  )
}

export default App