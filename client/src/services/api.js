import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const getBuildings = () => API.get('/buildings');
export const getBuildingById = (id) => API.get(`/buildings/${id}`);
export const createBuilding = (buildingData) => API.post('/buildings', buildingData);
export const deleteBuilding = (id) => API.delete(`/buildings/${id}`);

export const registerUser = (userData) => API.post('/users/register', userData);
export const loginUser = (userData) => API.post('/users/login', userData);

export default API;

