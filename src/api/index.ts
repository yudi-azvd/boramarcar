import axios from "axios";

const SERVER_ADDRESS = import.meta.env.VITE_SERVER_ADDRESS || 'http://localhost'
const PORT = import.meta.env.VITE_SERVER_PORT || 5000

let baseURL = ''

if (SERVER_ADDRESS.indexOf('localhost') > 0)
  baseURL = `${SERVER_ADDRESS}:${PORT}`
else
  baseURL = `${SERVER_ADDRESS}`

console.log(baseURL);

const api = axios.create({
  baseURL
})

export default api