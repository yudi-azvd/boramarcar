import address from "@/ip";
import axios from "axios";

let baseURL = address

console.log(baseURL);

const api = axios.create({
  baseURL
})

export default api