const express = require('express');
const { getRandomRecipes, getRecipeById, searchRecipesByIngredients, saveRecipeForUser, getFavorites } = require('../controllers/recipes.controller');
const router = express.Router();

router.get('/random', getRandomRecipes);
router.get('/:id', getRecipeById);
router.post('/favorites', getFavorites);
router.post('/search', searchRecipesByIngredients);
router.post('/save', saveRecipeForUser);

module.exports = router;
