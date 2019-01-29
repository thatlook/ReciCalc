import React from 'react';

const AddInstructions = props => (
  <label>
    <h3>Instructions:</h3>
    {props.instructions.map((val, i) => (
      <li key={`instructions-${i}`}>{val}</li>
    ))}
    <input
      type="text"
      name="instr"
      placeholder="Add instruction"
      onChange={props.handleChange}
    />
    <button className="button" name="instr" onClick={props.handleMore}>
      add
    </button>
  </label>
);

export default AddInstructions;
