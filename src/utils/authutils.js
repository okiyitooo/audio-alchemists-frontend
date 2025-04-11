import axios from 'axios';
export const API_BASE_URL = 'http://localhost:8083'; 
export const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && !config.url.startsWith('/auth')) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);