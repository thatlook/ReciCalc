module.exports.recipes = {
  getList: (req, res) => {
    //query datbase for a list of short recipe descriptions and return them
    res.status(200).send('Under construction! List of recipes to come.');
  },
  getOne: (req, res) => {
    //endpoint: /api/recipes/:recipeId
    //query databse for detailed information on the given recipe and return it
    res.status(200).send(`Under construction! Information on recipe ${req.params.recipeId} to come.`);
  },
  post: (req, res) => {
    //Store recipe in database
    res.status(404).send('Under construction! We are not currently able to store data.');
  }
};

module.exports.ingredients = {
  getDbByName: (req, res) => {
    //expect req.params to have 'q' or 'searchTerm' or something
    //Query database for ingredients matching a particular search string, and present them
    res.status(200).send('Under construction! Possible ingredient matches to come.');
  },
  getUsdaByName: (req, res) => {
    //expect req.params to have 'q' or 'searchTerm' or something
    //Query USDA NDB API for ingredients matching a particular search string, and present them
    res.status(200).send('Under construction! POssible NDB ingredient matches to come.');
  },
  getUsdaIngredientInfo: (req, res) => {
    //expect req.params.ndbno 
    //Query USDA API for nutritional data about the provided item number
    res.status(200).send(`Under consruction! Possible nutritional information about NDB item ${req.params.ndbno} to come.`);
  },
  post: (req, res) => {
    //Store ingredient in database
    res.status(404).send('Under construction! We are not currently able to store data.');
  }
}
