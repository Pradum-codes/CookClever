import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
});

const saveRecipe = async (userId, recipeId) => {
    const token = localStorage.getItem("accessToken");

    if (!userId || !token) {
        console.warn("Missing userId or token");
        return;
    }

    try {
        const res = await api.post(
        "/recipes/save",
        { userId, recipeId },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        );

        return res.data;
    } catch (error) {
        console.error(
            "Error saving recipe:",
            error.response?.data || error.message
        );
        throw new Error(error.response?.data?.message || "Failed to save recipe");
    }
};

export default saveRecipe;
