import React from 'react';

const AddIngredients = props => (
  <label>
    <h3>Ingredients:</h3>
    {props.ingredients.map((val, i, coll) => {
      return (
        <div key={`ingredients-${i}`}>
          <input
            type="text"
            name="ing"
            placeholder="Add ingredient"
            onChange={props.handleChange}
          />
          <button className="button" name="ing" onClick={props.handleMore}>
            more
          </button>
        </div>
      );
    })}
  </label>
);

export default AddIngredients;
