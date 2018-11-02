import React from 'react';
import { generateKeyPairSync } from 'crypto';

const gridWrapper = {
  display: 'grid',
  gridTemplateColumn: 'repeat(4, 1fr)',
  gridTemplateRow: 'repeat(4, 1fr)'
};

const resultStyle = {
  backgroundColor: 'lightGrey'
}

const SearchResults = (props) => {
  
  return (
    <div style={gridWrapper}>
      {props.results.map((x)=> (
        <div style={resultStyle}>
        <li>{x.title}</li>
        </div>
      ))}
    </div>
  )
}

export default SearchResults;