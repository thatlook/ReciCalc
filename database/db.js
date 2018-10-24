// Postgress init here
// Schema in separate file?

const options = require('db_config');

const knex = require('knex')({
  client: 'pg',
  connection: options
});

module.exports.fetchRecipeList = function() {
  //return a list of short recipe descriptions
};

module.exports.fetchRecipeById = function(recipeId) {
  //return the recipe and all relevant accompanying information
};

module.exports.searchIngredientByName = function(searchString) {
  //look for ingredients that might be the target and return them
};