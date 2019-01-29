import React from 'react';

const AddInstructions = props => (
  <label>
    <h3>Instructions:</h3>
    {props.instructions.map((val, i, coll) => {
      return (
        <div key={`instructions-${i}`}>
          <input
            type="text"
            name="instr"
            placeholder="Add instruction"
            onChange={props.handleChange}
          />
          <button className="button" name="instr" onClick={props.handleMore}>
            more
          </button>
        </div>
      );
    })}
  </label>
);

export default AddInstructions;
