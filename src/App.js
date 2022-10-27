import React from 'react';
import { useState, useEffect } from 'react';
import personService from './services/persons';
import Input from './components/Input';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const Message = ({ message, hook }) => {
  return <div className={message.type}>{message.text}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null);

  const hook = () => {
    console.log('hook');
    personService.getAll().then((response) => {
      setPersons(response);
    });
  };

  const newPerson = () => {
    return {
      name: newName,
      number: newNumber,
    };
  };

  useEffect(hook, [message]);
  const addNew = () => {
    personService
      .create(newPerson())
      .then((response) => {
        console.log('create response:', response);
        setPersons(persons.concat(response));
      })
      .then(
        updateMessage({
          type: 'success',
          text: `Successfully updated ${newName}`,
        }).catch((error) => {
          updateMessage({
            type: 'error',
            text: `${newName} was already removed from server`,
          });
        }),
      );
  };

  const shouldOverrideEntry = () => {
    return window.confirm(
      `${newName} is already added to the phonebook. Replace the old number with a new one?`,
    );
  };

  const update = (filterMatches) => {
    if (shouldOverrideEntry()) {
      console.log('filteredMatches', filterMatches);
      for (let n in filterMatches) {
        const match = filterMatches[n];
        personService
          .update(match.id, newPerson())
          .then((response) => {
            console.log('update response:', response);
            setPersons(
              persons.filter((p) => p.id !== match.id).concat(response),
            );
          })
          .then(
            updateMessage({
              type: 'success',
              text: `Successfully updated ${newName}`,
            }),
          )
          .catch((error) => {
            updateMessage({
              type: 'error',
              text: `${newName} was already removed from server`,
            });
          });
      }
    }
  };

  const updateMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const addEntry = (event) => {
    event.preventDefault();
    const filterMatches = persons.filter((p) => p.name === newName);
    if (filterMatches.length > 0) {
      update(filterMatches);
    } else {
      addNew();
    }
    setNewName('');
    setNewNumber('');
    setFilter('');
  };

  const deleteEntry = (event, person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deleteOne(person.id)
        .then((response) => {
          console.log('deleteOne response:', response);
          setPersons(persons.filter((p) => p.id !== person.id));
        })
        .then(
          updateMessage({
            type: 'success',
            text: `Successfully deleted ${person.name}`,
          }),
        )
        .catch((error) => {
          updateMessage({
            type: 'error',
            text: `${person.name} was already removed from server`,
          });
        });
    }
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
      {message ? <Message message={message} /> : null}
      <Input input={filterInput} />
      <h2>Add a New Number</h2>
      <PersonForm data={personFormData} />
      <h2>Numbers</h2>
      <Persons data={data} />
    </div>
  );
};

export default App;
