import axios from "axios";

const server_url = import.meta.env.VITE_SERVER
const url = axios.create({
    baseURL: `${server_url}/api`
});

export default url;
