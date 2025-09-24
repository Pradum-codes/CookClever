import url from "@/lib/api";

const fetchByIngredients = async (ingredients, setLoading, setError, setRecipes) => {
    const token = localStorage.getItem("accessToken");
    setLoading(true);
    setError(null);

    try {
        const res = await url.post(
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
