import React from 'react';
import { generateKeyPairSync } from 'crypto';



const SearchResultRecipe = (props) => {
  console.log(props.recipe, 'is props recipe')
  return (<div className="result-recipe-wrap">
    <a href={props.recipe.url}>
    <div className={props.recipe.label !== '' ? "result-recipe-title" : "divider"}>
      {props.recipe.label} 
    </div>
    <img src={props.recipe.image}
      href={props.recipe.url}
    />
    <div className={props.recipe.label !== '' ? "result-recipe-title" : "divider"}>
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
  </div>)
}


export default SearchResultRecipe;