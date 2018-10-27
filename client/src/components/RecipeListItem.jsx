import React from 'react';
import {Link} from 'react-router-dom';

const RecipeListItem = ({recipe}) => (
    <li>
      <h4><Link className='list-title link' to={`/recipes/${recipe.id}`}>{recipe.name}</Link></h4>
      <p className='description'>{recipe.description}</p>
      <p className='top'>{recipe.top_ingredients}</p>
    </li>
);

export default RecipeListItem;