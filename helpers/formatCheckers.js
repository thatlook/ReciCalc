const isValidNdbno = (item) => {
  if (typeof item === 'number') {
    item = item.toString().padStart(5, '0');
  }
  if (typeof item !== 'string') {
    console.log('INVALID recipe.ingredients.nbdno not string @', item);
    return false;
  }
  if (item.length !== 5) {
    console.log('INVALID recipe.ingredients.nbdno not length5 @', item);
    return false;
  }
  for(let i = 0; i < item.length; i++) {
    if (isNaN(item[i])) {
      console.log('INVALID recipe.ingredients.nbdno not a num @', item);
      return false;
    }
  }
  return true;
};

const isValidIngredientList = (ingredients) => {
  return ingredients.every(ing => {
    if(isValidNdbno(ing.ndbno) === false) {
      return false;
    }
    if(isNaN(ing.quantity)) {
      return false;
    }
    return true;
  });
} 

const isValidRecipe = (recipe) => {
  if (typeof recipe !== 'object') {
    console.log('INVALID recipe is not an object');
    return false;
  }
  if (typeof recipe.title !== 'string') {
    console.log('INVALID recipe.title is not a string');
    return false;
  }
  if (Array.isArray(recipe.instructions) === false) {
    console.log('INVALID recipe.instructions is not an arary');
    return false;
  }
  if (Array.isArray(recipe.ingredients) === false) {
    console.log('INVALID recipe.ingredients is not an array');
    return false;
  }
  if (isValidIngredientList(recipe.ingredients) === false) {
    return false;
  }
  return true;
};

module.exports.isValidRecipe = isValidRecipe;
module.exports.isValidNdbno = isValidNdbno;