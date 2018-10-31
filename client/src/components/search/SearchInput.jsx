import React from 'react';

const SearchInput = ({addIngredient, ingredient, handleIngredientChange}) => (
  <div className='search-input'>
    <h3>Search for Recipes by Ingredient!</h3>
    <input 
      className='user search'
      onChange={(e) => handleIngredientChange(e)}
      type='text' name='search' 
      placeholder='Enter an Ingredient'/>
    <input 
      onClick={() => addIngredient()}
      className='button' 
      type='submit' 
      value='Save'/> 
  </div>
)

export default SearchInput;