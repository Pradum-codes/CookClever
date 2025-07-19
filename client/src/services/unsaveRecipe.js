import axios from "axios";

const unsaveRecipe = async (userId, recipeId) => {
    try {
        const res = await axios.delete("http://localhost:3000/api/recipes/unsave", {
            data: {
                userId,
                recipeId
            }
        });
        
        console.log('Unsave response:', res.data);
        return res.data;

    } catch (error) {
        console.error("Error unsaving recipe:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to unsave recipe");
    }
};

export default unsaveRecipe;
