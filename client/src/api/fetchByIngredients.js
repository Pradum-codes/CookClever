import url from "@/lib/api";
import dummy from "@/api/dummy";

const fetchByIngredients = async (ingredients, setLoading, setError, setRecipes) => {
    const token = localStorage.getItem("accessToken");
    setLoading(true);
    setError(null);

    try {
        if (import.meta.env.VITE_USE_DUMMY !== "false") {
            const normalized = ingredients.map((item) => item.trim().toLowerCase()).filter(Boolean);
            const matched = (dummy.recipes || [])
                .filter((recipe) => {
                    const pool = [
                        recipe.title || "",
                        ...(recipe.extendedIngredients || []).map((ing) => ing.name || ing.original || ""),
                    ]
                        .join(" ")
                        .toLowerCase();
                    return normalized.every((ing) => pool.includes(ing));
                })
                .slice(0, 9);

            setRecipes(matched);
            return matched;
        }

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
