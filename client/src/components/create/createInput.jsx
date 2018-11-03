import React from 'react';

const Input = (props) => {
  if (props.ingredient) {
    return (
      <div>
        <input 
        type="text" 
        name={props.name} 
        placeholder={props.placeholder} 
        onChange={props.handleChange} 
        onBlur={props.handleBlur}
        />
        <button 
        className="button" 
        name="ing" 
        onClick={props.handleMore}>more</button>
      </div>
    )

  } else {

    return (
      <div>
        <input 
        type="text" 
        name={props.name} 
        placeholder={props.placeholder} 
        onChange={props.handleChange} 
        />

        <button 
        className="button" 
        name="instr" 
        onClick={props.handleMore}>more</button>
      </div>
    )
  }
}

export default Input;
