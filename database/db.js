// Postgress init here
// Schema in separate file?
const env = require('../db_config.js').environment;
const options = require('../knexfile')[env];

const knex = require('knex')(options);

// EXAMPLE DATABASE ACCESS FUNCTION:
//
module.exports.checkAccess = function(id) {
  return knex
     .select()
     .from('sample')
    // .where({id})
};

module.exports.fetchRecipeList = function() {
  //return a list of short recipe descriptions
  return knex.select().from('recipes');
};


module.exports.fetchRecipeById = function(recipeId) {
  //return the recipe and all relevant accompanying information
  
  const dataNeeded = [
    knex.select('*').from('recipes').where({id: recipeId}),
    knex.select({
      quantity: 'recipe_ingredients.quantity',
      position: 'recipe_ingredients.list_position',
      ndbno: 'ingredients.ndbno',
      name: 'ingredients.name',
      stdAmount: 'ingredients.std_amount',
      kcalPer: 'ingredients.kcal_per',
      fatPer: 'ingredients.fat_per',
      satFatPer: 'ingredients.sat_fat_per',
      fiberPer: 'ingredients.fiber_per',
      cholesterolPer: 'ingredients.cholesterol_per',
      sodiumPer: 'ingredients.sodium_per',
      carbsPer: 'ingredients.carbs_per',
      sugarPer: 'ingredients.sugar_per',
      proteinPer: 'ingredients.protein_per'
    })
    .from('recipe_ingredients')
    .join('ingredients', 'recipe_ingredients.food_no', '=', 'ingredients.ndbno')
    .where({'recipe_ingredients.recipe_id': recipeId})
  ]; 
  return Promise.all(dataNeeded)
};

module.exports.searchIngredientByName = function(searchString) {
  //look for ingredients that might be the target and return them
};

module.exports.addIngredient = function(ingredient) {
  //takes an ingredient object and stores it to the ingredients table
}

module.exports.addRecipeIngredient = function(recipeIngredient) {
  //takes an ingredient entry on a recipe and adds it to the recipe_ingredient junction table
}

module.exports.addRecipe = function(recipe) {
  //takes a recipe object, adds the basic data to the db, then calls addRecipeIngredient on each 
  //ingredient entry to store the necessary information
}