import axios, { AxiosError } from "axios";

const instance = axios.create({
  baseURL: import.meta.env.RENDERER_VITE_API_URL,
  timeout: 10000,
});

instance.interceptors.request.use(
  (config) => {
    if (!config.params) {
      config.params = {};
    }
    const cookie = localStorage.getItem("MUSIC_U");

    if (cookie) {
      config.params.cookie = `MUSIC_U=${cookie};`;
    }
    // config.params.timestamp = Date.now();
    return config;
  },
  (error: AxiosError) => {},
);

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error: AxiosError) => {},
);

export default instance;
