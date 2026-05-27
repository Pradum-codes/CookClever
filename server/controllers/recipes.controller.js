const axios = require('axios');
const SavedRecipe = require('../model/savedRecipe.model');

const API_KEY = process.env.SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com/recipes';

exports.getRandomRecipes = async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/random?number=9&includeNutrition=true&apiKey=${API_KEY}`);
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ msg: "Error fetching random recipes" });
    }
};

exports.getRecipeById = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.get(`${BASE_URL}/${id}/information?apiKey=${API_KEY}`);
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ msg: "Error fetching recipe by ID" });
    }
};

exports.searchRecipesByIngredients = async (req, res) => {
    const { ingredients, number = 9 } = req.body;

    if (!Array.isArray(ingredients) || ingredients.length === 0) {
        return res.status(400).json({ msg: "Ingredients array is required" });
    }

    try {
        const response = await axios.get(`${BASE_URL}/findByIngredients`, {
            params: {
                ingredients: ingredients.join(','),
                number,
                apiKey: API_KEY,
            },
        });

        res.json(response.data);
    } catch (err) {
        console.error("[API Error] Spoonacular fetch failed:", err.response?.data || err.message);
        res.status(500).json({ msg: "Error searching recipes" });
    }
};

exports.saveRecipeForUser = async (req, res) => {
    try {
        const { userId, recipeId, recipeData } = req.body;

        if (!userId || !recipeId) {
            return res.status(400).json({ message: "userId and recipeId are required" });
        }

        const saved = await SavedRecipe.findOneAndUpdate(
            { user: userId, recipeId },
            { $set: { recipeData: recipeData || null }, $setOnInsert: { user: userId, recipeId } },
            { new: true, upsert: true }
        );
        res.status(201).json({ message: "Recipe saved successfully", saved });
    } catch (err) {
        console.error("Error saving recipe:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.getFavorites = async (req, res) => {
    const { userId } = req.query;

    try {
        if (!userId) {
            return res.status(400).json({ msg: "userId is required" });
        }

        const favorites = await SavedRecipe.find({ user: userId });
        const recipes = [];
        const missingRecipeIds = [];

        favorites.forEach((fav) => {
            if (fav.recipeData) {
                recipes.push(fav.recipeData);
            } else {
                missingRecipeIds.push(fav.recipeId);
            }
        });

        // Backward-compatible fallback for older saved records that do not have cached recipe data.
        if (missingRecipeIds.length > 0 && API_KEY) {
            const recipePromises = missingRecipeIds.map((id) =>
                axios.get(`${BASE_URL}/${id}/information?apiKey=${API_KEY}`)
            );
            const recipeResponses = await Promise.allSettled(recipePromises);
            recipeResponses.forEach((result) => {
                if (result.status === "fulfilled") {
                    recipes.push(result.value.data);
                }
            });
        }

        res.status(200).json({ recipes });
    } catch (err) {
        console.error("Error fetching favorites:", err);
        res.status(500).json({ msg: "Error fetching favorites" });
    }
};

exports.removeRecipeForUser = async (req, res) => {
    const { userId, recipeId } = req.body;

    try {
        if (!userId || !recipeId) {
            return res.status(400).json({ message: "User ID and Recipe ID are required" });
        }

        const existing = await SavedRecipe.findOne({ user: userId, recipeId });
        if (!existing) {
            return res.status(404).json({ message: "Recipe not found in user's favorites" });
        }

        await SavedRecipe.deleteOne({ _id: existing._id });

        return res.status(200).json({ message: "Recipe removed successfully" });
    } catch (err) {
        console.error("Error removing recipe:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};
