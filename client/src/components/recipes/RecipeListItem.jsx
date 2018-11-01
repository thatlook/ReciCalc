import React from 'react';
import {Link} from 'react-router-dom';
// import { prependOnceListener } from 'cluster';

const RecipeListItem = (props) => (
    <li className='recipe-item'>
      <Link className='list-title link' to={`/recipes/${props.recipe.id}`}>{props.recipe.name}</Link>
      <p className='list-description'>{props.recipe.description}</p>
      <p className='list-top'>{props.recipe.top_ingredients}</p>
      <input type='submit' value='remove' onClick={()=>props.deleteRecipe(props.recipe)}/>
    </li>
);

export default RecipeListItem;