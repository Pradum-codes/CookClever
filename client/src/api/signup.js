import url from "@/lib/api";

async function signup({ username, email, password }) {
    const res = await url.post("/auth/register", { username, email, password });
    return res.data;
}

export default signup;
