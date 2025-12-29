import axios from "axios";

const server_url = import.meta.env.VITE_SERVER
console.log(server_url);
const url = axios.create({
    baseURL: `${server_url}/api`
});

export default url;