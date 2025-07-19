import axios from "axios";

const fetchRandomRecipes = async (setLoading, setError, setRecipes) => {
    setLoading(true);
    setError(null);
    try {
        const res = await axios.get(
            `https://api.spoonacular.com/recipes/random`,
            {
            params: {
                number: 9,
                apiKey: import.meta.env.VITE_SPOONACULAR_API_KEY, 
            },
            }
        );
        
        // Transform the API response to match your component structure
        const transformedRecipes = res.data.recipes.map(recipe => ({
            ...recipe,
            diets: [
                ...(recipe.vegetarian ? ['Vegetarian'] : []),
                ...(recipe.vegan ? ['Vegan'] : []),
                ...(recipe.glutenFree ? ['Gluten Free'] : []),
                ...(recipe.dairyFree ? ['Dairy Free'] : []),
                ...(recipe.veryHealthy ? ['Very Healthy'] : []),
                ...(recipe.cheap ? ['Budget Friendly'] : []),
            ]
        }));
        
        setRecipes(transformedRecipes);
    } catch (error) {
        setError('Failed to fetch recipes. Please try again later.');
        console.error('Error fetching recipes:', error);
    } finally {
        setLoading(false);
    }
};

export default fetchRandomRecipes;