import React from 'react';

const Input = ({ input }) => (
  <div>
    {`${input.label}: `}
    <input required value={input.value} onChange={input.action} />
  </div>
);

export default Input;
