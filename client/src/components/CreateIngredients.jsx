import React, {Component} from 'react';
import IngredientInput from './IngredientInput.jsx';


const CreateIngredients = ({ingredients, addNewIngredient, updateRecipe, deleteIngredient}) => (
        <div>
            <h3>Ingredients:</h3>
            <input className='button' type='button' value='Add Ingredient' onClick={addNewIngredient} />
            {ingredients.map((ingredient, index) => <IngredientInput
                key={`${ingredient.counter}`}
                index={index}
                ingredient={ingredient}
                updateRecipe={updateRecipe}
                deleteIngredient={deleteIngredient}
            />)}
        </div>
)
    

export default CreateIngredients;