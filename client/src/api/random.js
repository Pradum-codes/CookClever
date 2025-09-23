import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3000/api"
});

const random = async () => {
    const token = localStorage.getItem('accessToken');
    try {
        const res = await api.get("/recipes/random", {
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