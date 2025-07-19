import axios from "axios";

const fetchUser = async (email, password) => {
    console.log('fetchUser called with email:', email);
    
    try {
        console.log('Making API call to login endpoint...');
        const res = await axios.post("http://localhost:3000/api/auth/login", {
            email,
            password,
        });

        console.log('API response received:', res.status, res.data);
        const { token, user } = res.data;
        
        console.log('Extracted token and user:', { token: token ? 'exists' : 'missing', user });

        localStorage.setItem('authToken', token); // Use consistent token name
        console.log('Token stored in localStorage');
        
        return user;
    } catch (err) {
        console.error("Login API Error: ", err);
        console.error("Error response:", err.response?.data);
        console.error("Error status:", err.response?.status);
        throw new Error(err.response?.data?.message || "Login failed.");
    }
};

export default fetchUser;

