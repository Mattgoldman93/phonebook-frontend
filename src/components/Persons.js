import React from 'react';

const Person = ({ person, deleteEntry }) => (
  <div>
    {person.name} {person.number}{' '}
    <button
      onClick={(event) => {
        deleteEntry(event, person);
      }}>
      delete
    </button>
  </div>
);

const Persons = ({ data }) => {
  // if there's no filter, return all results
  const filterMatches = (str) =>
    data.filter ? str.toLowerCase().includes(data.filter.toLowerCase()) : true;

  return data.persons
    .filter((p) => filterMatches(p.name))
    .map((p) => (
      <Person key={p.name} person={p} deleteEntry={data.deleteEntry} />
    ));
};

export default Persons;
