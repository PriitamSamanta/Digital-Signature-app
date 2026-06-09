import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const authStorage =
      localStorage.getItem(
        "auth-storage"
      );

    if (authStorage) {
      const parsed =
        JSON.parse(authStorage);

      const token =
        parsed.state?.token;

      if (token) {
        config.headers.Authorization =
          `Bearer ${token}`;
      }
    }

    return config;
  }
);

export default api;