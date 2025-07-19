import React, { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import sampleRecipes from '../data/sampleRecipes';
import fetchRandomRecipes from '@/services/fetchRandom';
import { useRecipeSave } from '@/hooks/useRecipeSave';

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // Use the custom hook for save functionality
    const { isSaved, handleToggleSave, isSaving } = useRecipeSave();

    useEffect(() => {
        setRecipes(sampleRecipes); 
        fetchRandomRecipes(setLoading, setError, setRecipes);
    }, []);

    return (
        <div className="min-h-screen bg-white m-0">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
                🍳 Explore Random Recipes
            </h1>
            <button
                onClick={() => fetchRandomRecipes(setLoading, setError, setRecipes)}
                className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Fetch new recipes"
            >
                Refresh Recipes
            </button>
            </div>

            {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
                {error}
            </div>
            )}

            {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(9)].map((_, index) => (
                <div
                    key={index}
                    className="bg-white rounded-2xl shadow-md p-4 animate-pulse border border-gray-100"
                >
                    <div className="w-full h-48 bg-gray-200 rounded-xl mb-3"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-8 bg-gray-200 rounded-full w-20"></div>
                    </div>
                </div>
                ))}
            </div>
            ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.map((recipe) => (
                <RecipeCard
                    key={recipe.id}
                    id={recipe.id}
                    image={recipe.image}
                    title={recipe.title}
                    likes={recipe.aggregateLikes}
                    isSaved={isSaved(recipe.id)}
                    onSave={() => handleToggleSave(recipe.id)}
                    isLoading={isSaving(recipe.id)}
                    dietaryTags={recipe.diets || []}
                    vegetarian={recipe.vegetarian}
                />
                ))}
            </div>
            )}
        </div>
        </div>
    );
};

export default Home;