import React from 'react';
import SearchResultRecipe from './SearchResultRecipe.jsx';



const SearchResultList = (props) => (
  <span id="searchResultsWrap">
    {/* {props.searchResults.map((x) => console.log('THE THING', Object.values(x)))} */}
    {props.searchResults.map((result, index) => 
      <SearchResultRecipe recipe={result} key={index}/>
    )}
  </span>
)

export default SearchResultList;