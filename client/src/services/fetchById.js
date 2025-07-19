import axios from "axios";

const fetchById = async (id) => {
    try {
        const res = await axios.get(
            `https://api.spoonacular.com/recipes/${id}/information`,
            {
            params: {
                includeNutrition: false,
                apiKey: import.meta.env.VITE_SPOONACULAR_API_KEY, 
            },
            }
        );
        console.log(res.data)
        return res.data;
    } catch (error) {
        // setError('Failed to fetch recipes. Please try again later.');
        console.error('Error fetching recipes:', error);
    }
};

export default fetchById;