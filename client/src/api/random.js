import url from "@/lib/api";

const random = async () => {
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