import url from "@/lib/api";
import dummy from "@/api/dummy";

const fetchById = async (id) => {
    if (import.meta.env.VITE_USE_DUMMY !== "false") {
        const recipe = (dummy.recipes || []).find((item) => String(item.id) === String(id));
        if (!recipe) throw new Error("Recipe not found in dummy dataset");
        return recipe;
    }

    const token = localStorage.getItem('accessToken');

    if (!id) {
        throw new Error('Recipe ID is required');
    }

    try {
        const res = await url.get(`/recipes/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return res.data;
    } catch (err) {
        console.error(`[API Error] Failed to fetch recipe by ID (${id}):`, err.response?.data || err.message);
        throw err;
    }
};

export default fetchById;
