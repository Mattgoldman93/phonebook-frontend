import React from 'react';
import Input from './Input';

const PersonForm = ({ data }) => (
  <form onSubmit={data.action}>
    {data.inputs.map((input) => (
      <Input key={input.label} input={input} />
    ))}
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default PersonForm;
