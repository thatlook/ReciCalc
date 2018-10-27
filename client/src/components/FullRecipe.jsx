import React, {Component} from 'react';

class FullRecipe extends Component {
  constructor(props) {
      super(props);
      this.state = {
      }
  }

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
  // * 
  // *   //NOTE: cholesterol and sodium stored in mg
  // *   // rest are in g (except kcal)

  componentDidMount() {
    // make call to database for particular recipe referencing {this.props.match.params.id} to retrieve recipe by id number
    // recipe object returned in format below. hardcoding example for testing
    // state is also hardcoded to a dummy recipe because setState is asynchronous and without 
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
              /*probably all the database stored nutrients in format 'nutnamePer: number'*/
           }
          },
          {
            name: 'Sample data',
            ndbno: 1128,
            quantity: 9,
            nutrition: {
              /*more nutrition info*/
            }
          }
        ],
        instructions: ['instruction 1', 'instruction 2']
      }
    })
  }

  calculateNutrition(){
    // does this helper function exist?
  }

  render () {
    const {recipe} = this.state;
    if (recipe === undefined) {
      return(<div>ERROR: RECIPE DOES NOT EXIST</div>)
    } else {
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
            {/* map out nutrition totals */}
          </div>
        </div>
      )
    }
  }
}

export default FullRecipe;