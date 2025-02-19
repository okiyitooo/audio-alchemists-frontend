export const API_BASE_URL = 'http://localhost:8084'; 
export const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}