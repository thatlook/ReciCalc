import React from 'react';

const SearchInput = ({ingredients, deleteIngredient}) => (
  <div className='search-list'>
    <h3 className='search'>Selected Ingredients:</h3>
    {ingredients.map((ingredient, i) => (
      <div>
        <ul className='search-list-entry' key={i}>• {ingredient}</ul>
        <input 
          className='button remove-btn'
          type='submit' 
          value='X'
          onClick={(e) => deleteIngredient(e)}/>
      </div>
    ))}
  </div>
)

export default SearchInput;