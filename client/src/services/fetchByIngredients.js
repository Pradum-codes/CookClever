import axios from "axios";

const fetchByIngredients = async (ingredients, setLoading, setError, setRecipes) => {
    setLoading(true);
    setError(null);
    try {
        const res = await axios.get(
            `https://api.spoonacular.com/recipes/findByIngredients`,
            {
            params: {
                ingredients: ingredients,
                number: 9,
                apiKey: import.meta.env.VITE_SPOONACULAR_API_KEY, 
            },
            }
        );
        
        // Transform the API response to match your component structure
        const transformedRecipes = res.data.map(recipe => ({
            id: recipe.id,
            title: recipe.title,
            image: recipe.image,
            aggregateLikes: recipe.likes,
            vegetarian: false, // This API doesn't provide vegetarian info
            diets: [
                // Add some diet tags based on missing/used ingredients if needed
                ...(recipe.usedIngredientCount > recipe.missedIngredientCount ? ['Good Match'] : []),
                ...(recipe.missedIngredientCount === 0 ? ['Perfect Match'] : []),
                ...(recipe.missedIngredientCount <= 2 ? ['Easy to Make'] : [])
            ],
            // Additional data specific to ingredient-based search
            usedIngredientCount: recipe.usedIngredientCount,
            missedIngredientCount: recipe.missedIngredientCount,
            usedIngredients: recipe.usedIngredients,
            missedIngredients: recipe.missedIngredients
        }));
        
        setRecipes(transformedRecipes);
        
    } catch (error) {
        setError('Failed to fetch recipes. Please try again later.');
        console.error('Error fetching recipes:', error);
    } finally {
        setLoading(false);
    }
};

export default fetchByIngredients;