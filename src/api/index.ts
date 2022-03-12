import axios from "axios";

const SERVER_ADDRESS = import.meta.env.VITE_SERVER_ADDRESS || 'http://localhost'
const PORT = import.meta.env.VITE_SERVER_PORT || 5000


const api = axios.create({
  baseURL: `${SERVER_ADDRESS}:${PORT}`
})

export default api