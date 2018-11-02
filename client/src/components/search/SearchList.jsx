import React from 'react';

const SearchList = ({ingredients, deleteIngredient}) => (
  <div className='search-list'>
    {ingredients.map((ingredient, i) => (
      <div key={i}>
        <ul 
          className='search-list-entry'
        >• {ingredient}</ul>
        <input 
          className='button remove-btn'
          type='submit' 
          value='X'
          name={i}
          onClick={(e) => deleteIngredient(e)}/>
      </div>
    ))}
  </div>
)

export default SearchList;