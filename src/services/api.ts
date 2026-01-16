import axios from 'axios';

// Déterminer l'URL de base selon l'environnement
const getApiBaseUrl = (): string => {
  // En production (Render), utiliser l'URL de production
  if (window.location.hostname.includes('onrender.com')) {
    return 'https://o-rubri-backend.onrender.com';
  }
  // En développement local
  return 'http://localhost:3000';
};

const API_BASE_URL = getApiBaseUrl();

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;