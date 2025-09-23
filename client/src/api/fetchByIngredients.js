import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

const fetchByIngredients = async (ingredients, setLoading, setError, setRecipes) => {
    const token = localStorage.getItem("accessToken");
    setLoading(true);
    setError(null);

    try {
        const res = await api.post(
            "/recipes/search",
            { ingredients, number: 9 }, // body
            {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            }
        );

        setRecipes(res.data);
        return res.data;
    } catch (err) {
        console.error(`[API Error] Failed to fetch recipes by ingredients:`, err.response?.data || err.message);
        setError(err.response?.data?.msg || "Something went wrong while fetching recipes");
        throw err;
    } finally {
        setLoading(false);
    }
};

export default fetchByIngredients;
