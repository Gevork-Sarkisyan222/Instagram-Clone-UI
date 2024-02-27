import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://instagram-server-kdcw.onrender.com',
  // baseURL: 'http://localhost:7777',
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');
  return config;
});

export default instance;
