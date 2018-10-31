import React from 'react';

const SearchInput = (props) => (
  <div className='search-input'>
    <h3>Search for Recipes by Ingredient!</h3>
    <input className='user search' type='text' name='search' placeholder='Enter an Ingredient'/>
    <input className='button' type='submit' value='Save'/> 
  </div>
)

export default SearchInput;