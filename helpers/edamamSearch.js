import axios from 'axios';
const config = require('../config.js');

//sends api get request for recipies including selected ingredients
const getRecipeFromEdamam = (ingredients) => {

  let q = ingredients.reduce((acc, ingredient) => (
    acc.concat(`, ${ingredient}`)
  ))
  
  console.log(q);

  return new Promise((resolve, reject) => {
    axios.get('https://api.edamam.com/search',{
      qs: {
        q: q,
        app_id: `${config.EDAMAM_APP_ID}`,
        app_key: `${config.EDAMAM_KEY}`,
        to: 8,
      }
    })
    .then(res => {
      console.log('response from edamam is ', res);
      resolve('resolve todo')
    })
    .catch(err => {
      console.log('error in api get from edamam', err);
      reject('error in api get from edamam', err);
    })
  });
}

export {getRecipeFromEdamam};


// base url https://api.edamam.com
// docs https://developer.edamam.com/edamam-docs-recipe-api
/*
required params:
q         string Query text.For example q = chicken.This or the r parameter
  are required
r         string Returns information about a specific recipe based on its ID
  ie. - r = http % 3 A % 2 F % 2 Fwww.edamam.com % 2 Fontologies % 2 Fedamam.owl
  % 23 recipe_9b5945e03f05acbf9d69625138385408 This or the q parameter are required
- either q or r is required
app_id    string Your 3 scale application ID
app_key   string Your 3 scale application key(please note app_id / app_key are an ordered pair)

optional:
from      int index start of return array default 0
to        int index end of return array default from + 10
ingr      int max number of ingredients
diet      enum diet type ex: “balanced”, “high - protein”, “high - fiber”,
 “low - fat”, “low - carb”, “low - sodium”
  health    enum health labels such as “peanut-free”, “tree-nut-free”,
  “soy-free”, “fish-free”, “shellfish-free”
calories  range MIN+, MIN-MAX, MAX  “calories=100-300” -> 100-300 kcal per
  serving
time      range same as cal
excluded  string exclude ingredients



*/
