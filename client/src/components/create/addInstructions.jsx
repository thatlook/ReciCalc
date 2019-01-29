import React from 'react';
import Input from './createInput.jsx';

const AddInstructions = props => (
  <label>
    <h3>Instructions:</h3>
    {props.instructions.map((val, i, coll) => {
      return (
        <Input
          key={'item-' + i}
          handleChange={props.handleChange}
          value={val}
          handleMore={props.handleMore}
          name="instr"
          placeholder="Add instruction"
        />
      );
    })}
  </label>
);

export default AddInstructions;
