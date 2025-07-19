import axios from "axios";

const saveRecipes = async (userId, recipeId) => {
    try {
        console.log('Saving recipe:', { userId, recipeId }); // Debug log
        
        const res = await axios.post("http://localhost:3000/api/recipes/save", {
            userId,
            recipeId
        });
        
        console.log('Save response:', res.data);
        return res.data;

    } catch (error) {
        console.error("Error saving recipe:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to save recipe");
    }
};

export default saveRecipes;
