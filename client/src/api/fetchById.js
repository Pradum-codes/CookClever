import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
});

const fetchById = async (id) => {
    const token = localStorage.getItem('accessToken');

    if (!id) {
        throw new Error('Recipe ID is required');
    }

    try {
        const res = await api.get(`/recipes/${id}`, {
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
