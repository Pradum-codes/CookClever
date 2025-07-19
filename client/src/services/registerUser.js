import axios from "axios";

const registerUser = async (username, email, password) => {
    try {
        const res = await axios.post("http://localhost:3000/api/auth/register", {
            username,
            email,
            password,
        });

        const {user} = res.data;
        return user;
    } catch (err) {
        console.error("Registeration Error: ", err);
        throw new Error(err.response?.data?.message || "Registeration failed.");
    }
};

export default registerUser;

