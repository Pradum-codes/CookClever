import url from "@/lib/api";
import dummy from "@/api/dummy";

const random = async () => {
    // Local dataset mode to avoid consuming Spoonacular quota.
    if (import.meta.env.VITE_USE_DUMMY !== "false") {
        const recipes = [...(dummy.recipes || [])];
        const shuffled = recipes.sort(() => Math.random() - 0.5).slice(0, 9);
        return { recipes: shuffled };
    }

    const token = localStorage.getItem('accessToken');
    try {
        const res = await url.get("/recipes/random", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (err) {
        console.error("Failed to fetch random recipes:", err);
        throw err;
    }
};

export default random;
