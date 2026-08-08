import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Interceptor to attach Bearer token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Building Assessment Endpoints
export const getBuildings = () => API.get('/buildings');
export const getBuildingById = (id) => API.get(`/buildings/${id}`);
export const createBuilding = (buildingData) => API.post('/buildings', buildingData);
export const deleteBuilding = (id) => API.delete(`/buildings/${id}`);

// Structured AI Recommendation Engine
export const getAIAnalysis = (buildingData) => API.post('/ai/recommend', buildingData);

// Authentication Endpoints
export const signupUser = (userData) => API.post('/auth/signup', userData);
export const loginUser = (userData) => API.post('/auth/login', userData);
export const getMe = () => API.get('/auth/me');

// Legacy user compatibility
export const registerUser = (userData) => API.post('/users/register', userData);

export default API;
