import axios from 'axios';
import Config from 'react-native-config';

const API_KEY = Config.API_KEY;
const BASE_URL = Config.BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export default axiosInstance;
