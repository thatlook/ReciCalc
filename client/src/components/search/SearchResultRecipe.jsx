import React from 'react';
import { generateKeyPairSync } from 'crypto';



const SearchResultRecipe = (props) => (
  <div className="result-recipe-wrap">
    <a className="resutl-recipe-title" href={props.recipe.url}>
    <div className="result-recipe-title">
      {props.recipe.label} 
    </div>
    <img src={props.recipe.image}
      href={props.recipe.url}
    />
    <div className="result-recipe-title">
      {props.recipe.source}
    </div>
    </a>
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