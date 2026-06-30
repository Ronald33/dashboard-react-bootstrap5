import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '5000'), 
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;