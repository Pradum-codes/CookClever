import axios from "axios";

const fetchFavorites = async (userId) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
        console.warn("User token not provided");
        return [];
    }

    try {
        const res = await axios.post(`http://localhost:3000/api/recipes/favorites?userId=${userId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return res.data;
    } catch (error) {
        console.error(
            "Error fetching favorites:",
            error.response?.data || error.message
        );
        throw new Error(error.response?.data?.message || "Failed to fetch favorites");
    }
};

export default fetchFavorites;
