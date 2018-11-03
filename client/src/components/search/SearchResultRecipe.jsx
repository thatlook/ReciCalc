import React from 'react';
import { generateKeyPairSync } from 'crypto';



const SearchResultRecipe = (props) => (
  <div className="result-recipe-wrap">
    <img src={props.recipe.image}/>
    <div className="result-recipe-title">
      {props.recipe.label}
    </div>
    <span className="divider"></span>
    <ul className="result-recipe-ingredient-list">
      {props.recipe.ingredientLines.map((ingredient, index) => (
        <li className="result-recipe-ingredient" key={props.recipe.label+index}>
          {ingredient}
        </li>
      ))}
    </ul>
  </div>
)

export default SearchResultRecipe;