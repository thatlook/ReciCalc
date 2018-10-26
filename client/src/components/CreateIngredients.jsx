import React, {Component} from 'react';
import IngredientInput from './IngredientInput.jsx';


const CreateIngredients = ({ingredients, addIngredient}) => (
        <div>
            <h3>Ingredients:</h3>
            <input className='button' type='button' value='Add Ingredient' onClick={addIngredient} />
            {ingredients.map((ingredient, index) => <IngredientInput
                key={index}
                index={index}
                ingredient={ingredient}
            />)}
        </div>
)
    

export default CreateIngredients;

// *   ndbno INT PRIMARY KEY,
// *   name TEXT NOT NULL,
// *   std_amount NUMERIC NOT NULL,
// *   std_measure TEXT NOT NULL,
// *   kcal_per NUMERIC,
// *   fat_per NUMERIC,
// *   sat_fat_per NUMERIC,
// *   fiber_per NUMERIC,
// *   cholesterol_per NUMERIC,
// *   sodium_per NUMERIC,
// *   carbs_per NUMERIC,
// *   sugar_per NUMERIC,
// *   protein_per NUMERIC