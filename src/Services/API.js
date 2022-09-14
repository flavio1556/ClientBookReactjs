import axios from "axios";

const API = axios.create({baseURL: 'http://localhost:44386'});

export default API;