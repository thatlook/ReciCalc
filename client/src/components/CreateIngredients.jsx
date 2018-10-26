import React, {Component} from 'react';
import IngredientInput from './IngredientInput.jsx';


const CreateIngredients = ({ingredients, addNewIngredient, saveIngredient}) => (
        <div>
            <h3>Ingredients:</h3>
            <input className='button' type='button' value='Add Ingredient' onClick={addNewIngredient} />
            {ingredients.map((ingredient, index) => <IngredientInput
                key={index}
                index={index}
                ingredient={ingredient}
                saveIngredient={saveIngredient}
            />)}
        </div>
)
    

export default CreateIngredients;