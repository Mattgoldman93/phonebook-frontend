import React from 'react';
import { useState, useEffect } from 'react';
import personService from './services/persons';
import Input from './components/Input';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  const hook = () => {
    console.log('hook');
    personService.getAll().then((response) => {
      setPersons(response);
    });
  };

  useEffect(hook, []);

  const addEntry = (event) => {
    event.preventDefault();
    const names = persons.map((p) => p.name);
    if (names.includes(newName)) {
      alert(`${newName} is already added to the phonebook.`);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      personService.create(newPerson).then((response) => {
        console.log('create response:', response);
        setPersons(persons.concat(response));
      });
    }
    setNewName('');
    setNewNumber('');
    setFilter('');
  };

  const deleteEntry = (event, id) => {
    personService.deleteOne(id).then((response) => {
      console.log('deleteOne response:', response);
      setPersons(persons.filter((p) => p.id !== id));
    });
  };

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilter = (event) => setFilter(event.target.value);

  const personFormData = {
    action: addEntry,
    inputs: [
      { label: 'name', value: newName, action: handleNameChange },
      { label: 'number', value: newNumber, action: handleNumberChange },
    ],
  };

  const filterInput = {
    label: 'Filter Contacts by Name',
    value: filter,
    action: handleFilter,
  };

  const data = { persons, filter, deleteEntry };

  return (
    <div>
      <h2>Phonebook</h2>
      <Input input={filterInput} />
      <h2>Add a New Number</h2>
      <PersonForm data={personFormData} />
      <h2>Numbers</h2>
      <Persons data={data} />
    </div>
  );
};

export default App;
