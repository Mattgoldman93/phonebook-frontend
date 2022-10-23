import React from 'react';

const Person = ({ person }) => (
  <p>
    {person.name} {person.number}
  </p>
);

const Persons = ({ filter, persons }) => {
  // if there's no filter, return all results
  const filterMatches = (str) =>
    filter ? str.toLowerCase().includes(filter.toLowerCase()) : true;

  return persons
    .filter((p) => filterMatches(p.name))
    .map((p) => <Person key={p.name} person={p} />);
};

export default Persons;
