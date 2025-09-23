const express = require('express');
const { getRandomRecipes, getRecipeById, searchRecipesByIngredients, saveRecipeForUser, getFavorites, removeRecipeForUser } = require('../controllers/recipes.controller');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/random', authMiddleware, getRandomRecipes);
router.get('/:id', authMiddleware, getRecipeById);
router.post('/favorites', authMiddleware,  getFavorites);
router.post('/search', authMiddleware, searchRecipesByIngredients);
router.post('/save', authMiddleware, saveRecipeForUser);
router.post('/remove', authMiddleware, removeRecipeForUser);

module.exports = router;
