import React from 'react';
import {Link} from 'react-router-dom';

const RecipeListItem = ({recipe}) => (
    <li>
      <Link to={`/recipes/${recipe.id}`}><span>{recipe.title}</span></Link>
      <span>{recipe.description}</span>
      <span>{recipe.id}</span>
    </li>
);

export default RecipeListItem;