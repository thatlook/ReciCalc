const router = require('express').Router();

const recipesRouter = require('./routes/recipes').recipes;
const ingredientsRouter = require('./routes/ingredients').ingredients;
const searchEdamam = require('./routes/search').searchEdamam;
const usersRouter = require('./routes/users').users;

router.get('/api/recipes/', recipesRouter.getList);
router.get('/api/recipes/:recipeId', recipesRouter.getOne);
router.post('/api/recipes', recipesRouter.post);
router.delete('/api/recipes/:recipeId', recipesRouter.delete);

router.get('/api/ingredients', ingredientsRouter.getDbByName);
router.get('/api/ingredients/usda', ingredientsRouter.getUsdaByName);
router.get('/api/ingredients/usda/:ndbno', ingredientsRouter.getUsdaIngredientInfo);
router.post('/api/ingredients', ingredientsRouter.IngredientSearch);

router.get('/api/search', searchEdamam.getRecipeFromEdamam);

router.post('/api/users', usersRouter.post);

module.exports = router;
