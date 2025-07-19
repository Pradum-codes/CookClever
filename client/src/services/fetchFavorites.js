import axios from "axios";

const fetchFavorites = async (userId) => {
    try {
        const res = await axios.post("http://localhost:3000/api/recipes/favorites", {
            userId
        });
        console.log(userId)
        console.log(res)

        // Return the full response data which contains { recipes: [...] }
        return res.data;

    } catch (error) {
        console.error("Error fetching favorites:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to fetch favorites");
    }
};

export default fetchFavorites;
