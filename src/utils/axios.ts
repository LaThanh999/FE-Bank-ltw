import Axios from 'axios';
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'constants/common';
import historyRouter from 'utils/history';

const BASE_URL = 'https://localhost:3008';

export const socketURL = BASE_URL;

export const baseURL = `${BASE_URL}/api`;

export const axios = Axios.create({
  baseURL,
});

const ignoreApis = ['/api/v1/auth/refreshToken'];

axios.interceptors.request.use((config) => ({
  ...config,
  headers: {
    ...config.headers,
    Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
  },
}));

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      !ignoreApis.includes(originalRequest.url)
    ) {
      originalRequest._retry = true;
      const accessToken = localStorage.getItem(ACCESS_TOKEN);
      const refreshToken = localStorage.getItem(REFRESH_TOKEN);
      try {
        const { data } = await axios.post('/api/auth/refreshToken', {
          accessToken,
          refreshToken,
        });
        localStorage.setItem(ACCESS_TOKEN, data.accessToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(
          ACCESS_TOKEN,
        )}`;
        return axios(originalRequest);
      } catch (err) {
        const errFormat = err as any;
        if (errFormat?.response?.status === 401) {
          localStorage.removeItem(ACCESS_TOKEN);
          localStorage.removeItem(REFRESH_TOKEN);
          historyRouter.replace('/login');
        }
      }
    }
    return Promise.reject(error);
  },
);
export default axios;
