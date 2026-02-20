import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Generic CRUD operations
const createCRUD = (endpoint) => ({
  getAll: (params = {}) => api.get(`/api/crud/${endpoint}`, { params }),
  getById: (id) => api.get(`/api/crud/${endpoint}/${id}`),
  create: (data) => api.post(`/api/crud/${endpoint}`, data),
  update: (id, data) => api.put(`/api/crud/${endpoint}/${id}`, data),
  delete: (id) => api.delete(`/api/crud/${endpoint}/${id}`)
});

export const apiService = {
  // CRUD operations
  salesData: createCRUD('sales'),
  performanceMetrics: createCRUD('performance'),
  userMetrics: createCRUD('user-metrics'),
  users: createCRUD('users'),
  
  // Auth
  login: (credentials) => api.post('/api/auth/login', credentials),
  register: (userData) => api.post('/api/auth/register', userData)
};