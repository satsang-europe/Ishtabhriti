import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.mode === "development"
      ? "http://localhost:4500/donation"
      : "http://localhost:4500/donation",
  withCredentials: true, // send cookies to the server
});

export default axiosInstance;
