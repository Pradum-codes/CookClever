const axios = require('axios');
const SavedRecipe = require('../model/savedRecipe.model');

const API_KEY = process.env.RECIPE_API_KEY;
const BASE_URL = 'https://api.spoonacular.com/recipes';

exports.getRandomRecipes = async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/random?number=1&apiKey=${API_KEY}`);
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ msg: "Error fetching random recipes", err });
    }
};

exports.getRecipeById = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.get(`${BASE_URL}/${id}/information?apiKey=${API_KEY}`);
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ msg: "Error fetching recipe by ID", err });
    }
};

exports.searchRecipesByIngredients = async (req, res) => {
    const { ingredients } = req.body;
    try {
        const response = await axios.get(`${BASE_URL}/findByIngredients`, {
        params: {
            ingredients: ingredients.join(','),
            number: 10,
            apiKey: API_KEY
        }
        });
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ msg: "Error searching recipes", err });
    }
};

exports.saveRecipeForUser = async (req, res) => {
    try {
        const { userId, recipeId } = req.body;

        if (!userId || !recipeId) {
            return res.status(400).json({ message: "userId and recipeId are required" });
        }

        const newSavedRecipe = new SavedRecipe({
            recipeId: recipeId,
            user: userId, // Note: Mongoose expects ObjectId here, but it will auto-convert from string
        }); 

        const saved = await newSavedRecipe.save();
        res.status(201).json({ message: 'Recipe saved successfully', saved });
    } catch (err) {
        console.error("Error saving recipe:", err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.getFavorites = async (req, res) => {
    const { userId } = req.body;

    try {
        // Step 1: Fetch all favorites for the user
        const favorites = await SavedRecipe.find({ user: userId });

        // Step 2: Fetch recipe info for each recipeId
        const recipePromises = favorites.map(fav => 
            axios.get(`https://api.spoonacular.com/recipes/${fav.recipeId}/information?apiKey=${API_KEY}`)
        );

        const recipeResponses = await Promise.all(recipePromises);

        // Step 3: Extract recipe data
        const recipes = recipeResponses.map(response => response.data);

        res.status(200).json({ recipes });
    } catch (err) {
        console.error("Error fetching favorites:", err);
        res.status(500).json({ msg: "Error fetching favorites", err });
    }
};