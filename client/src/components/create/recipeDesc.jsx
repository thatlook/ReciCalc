import React from 'react';

const RecipeDesc = props => (
  <div>
    <label>
      <h3>Recipe title:</h3>
      <input
        type="text"
        name="title"
        placeholder="Add recipe title"
        onChange={props.handleChange}
      />
    </label>

    <label>
      <h3>Recipe description:</h3>
      <textarea
        name="description"
        placeholder="Add recipe description"
        onChange={props.handleChange}
      />
    </label>
  </div>
);

export default RecipeDesc;
