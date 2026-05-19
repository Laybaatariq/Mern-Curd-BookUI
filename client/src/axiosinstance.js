import axios from 'axios';

// Create axios instance with base URL
export const bookBaseUrl = axios.create({
    baseURL: 'http://localhost:5000/api/books',  // Backend URL
    headers: {
        'Content-Type': 'application/json'
    }
});

// Optional: Add request interceptor for debugging
bookBaseUrl.interceptors.request.use(
    (config) => {
        console.log(`📤 Making ${config.method.toUpperCase()} request to: ${config.url}`);
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Optional: Add response interceptor for debugging
bookBaseUrl.interceptors.response.use(
    (response) => {
        console.log(`📥 Response from ${response.config.url}:`, response.data);
        return response;
    },
    (error) => {
        console.error('Response error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);