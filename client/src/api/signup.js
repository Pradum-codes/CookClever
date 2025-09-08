import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api"
});

async function signup({ username, email, password }) {
    const res = await api.post("/auth/register", { username, email, password });
    return res.data;
}

export default signup;
