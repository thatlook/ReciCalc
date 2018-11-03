import React from 'react';

const searchInputStyle = {
  display: 'inline-block'
}

const SearchInput = ({addIngredient, ingredient, handleIngredientChange}) => (
  <span className='search-input' style={searchInputStyle}>
    <input 
      className='user search'
      value={ingredient}
      onChange={(e) => handleIngredientChange(e)}
      type='text' name='search' 
      placeholder='Enter an Ingredient'/>
    <input 
      onClick={() => addIngredient()}
      className='button' 
      type='submit' 
      value='Add'/> 
  </span>
)

export default SearchInput;