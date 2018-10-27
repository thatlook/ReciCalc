import React, {Component} from 'react';

class FullRecipe extends Component {
  constructor(props) {
      super(props);
      this.state = {
      }
  }

  componentDidMount() {
    // make call to database for particular recipe referencing {this.props.match.params.id} to retrieve recipe by id number
    // recipe object returned in format below. hardcoding example for testing
    this.setState({
      recipe: {
        title: 'Recipe One Name',
        id: 1,
        description: 'string describing recipe one',
        topIngredients: 'Education, sample data',
        ingredients: [
          {
            name: 'Education',
            ndbno: 101,
            quantity: 100,
            nutrition: {
              kcalPer: 1,
              fatPer: 2,
              satFatPer: 3,
              fiberPer: 4,
              cholesterolPer: 5,
              sodiumPer: 6,
              carbsPer: 7,
              sugarPer: 8,
              proteinPer: 9
           }
          },
          {
            name: 'Sample data',
            ndbno: 1128,
            quantity: 9,
            nutrition: {
              kcalPer: 1,
              fatPer: 2,
              satFatPer: 3,
              fiberPer: 4,
              cholesterolPer: 5,
              sodiumPer: null,
              carbsPer: null,
              sugarPer: null,
              proteinPer: null
           }
          }
        ],
        instructions: ['instruction 1', 'instruction 2']
      }
    })
  }

  calculateNutrition(){
    const {recipe} = this.state
    let totalNutrition = {};
    for (let ingredient of recipe.ingredients) {
      for (let nutrient in ingredient.nutrition) {
        if (typeof ingredient.nutrition[nutrient] === 'number') {
          let ingredientNutrientContribution = ingredient.nutrition[nutrient]*(ingredient.quantity/100)
          totalNutrition[nutrient] = totalNutrition[nutrient] + ingredientNutrientContribution  || ingredientNutrientContribution; 
        }
      }
    }
    console.log(totalNutrition);
    return totalNutrition;
  }

  render () {
    const {recipe} = this.state;
    if (recipe === undefined) {
      return(<div>ERROR: RECIPE DOES NOT EXIST</div>)
    } else {
      let nutritionObject = this.calculateNutrition();
      return (
        <div id='full-recipe'>
          <h2>WILL RENDER FULL RECIPE FOR RECIPE WITH ID NUMBER : {this.props.match.params.id}</h2>
          <h3>{recipe.title}</h3>
          <p className='description'>{recipe.description}</p>
          <ul>
            <h4>Ingredients:</h4>
            {recipe.ingredients.map(ingredient => 
              <li key={ingredient.ndbno}>{ingredient.name}  -  {ingredient.quantity} grams</li>)}
          </ul>
          <ol>
            <h4>Instructions:</h4>
            {recipe.instructions.map((instruction, index) =>
              <li key={index}>{instruction}</li>  
            )}
          </ol>
          <div id='nutrition'>
            <h4>Nutrition Information</h4>
            <ul id='nutrient-list'>
              <li className='nutrient'>Calories: {nutritionObject.kcalPer} cals</li>
              <li className='nutrient'>Total Fat: {nutritionObject.fatPer} g</li>
              <li className='nutrient'>Saturated Fat: {nutritionObject.satFatPer} g</li>
              <li className='nutrient'>Cholesterol: {nutritionObject.cholesterolPer} mg</li>
              <li className='nutrient'>Sodium: {nutritionObject.sodiumPer} mg</li>
              <li className='nutrient'>Total Carbohydrates: {nutritionObject.carbsPer} g</li>
              <li className='nutrient'>Sugar: {nutritionObject.sugarPer} g</li>
              <li className='nutrient'>Fiber: {nutritionObject.fiberPer} g</li>
              <li className='nutrient'>Protein: {nutritionObject.proteinPer} g</li>
            </ul>
          </div>
        </div>
      )
    }
  }
}

export default FullRecipe;