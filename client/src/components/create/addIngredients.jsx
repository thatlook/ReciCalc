import React from 'react';

const AddIngredients = props => (
  <label>
    <h3>Ingredients:</h3>
    {props.ingredients.map((val, i) => (
      <li key={`ingredients-${i}`}>{val.name}</li>
    ))}
    <input
      type="text"
      name="ing"
      placeholder="Add ingredient"
      onChange={props.handleChange}
    />
    <button className="button" name="ing" onClick={props.handleMore}>
      add
    </button>
  </label>
);

export default AddIngredients;
