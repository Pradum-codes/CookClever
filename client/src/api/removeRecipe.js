import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

const removeRecipe = async (recipeId, userId) => {
    const token = localStorage.getItem("accessToken");

    if (!userId || !token) {
        console.log("User ID or token not provided");
        return;
    }

    try {
        const res = await api.post(
            "/recipes/remove",
            { userId, recipeId },
            {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            }
        );

        return res.data;
    } catch (error) {
        console.error("Error removing recipe:", error.response?.data || error.message);
        throw error;
    }
};

export default removeRecipe;