// axiosInstance.ts
import axios from "axios";
const axiosInstance = axios.create({
  // You can set common config here, like headers or baseURL
});

const attachInterceptors = (showError: (message: string) => void) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        showError(
          `Error: ${error.response.status} ${error.response.statusText}`
        );
      } else if (error.request) {
        // The request was made but no response was received
        showError("No response received from server.");
      } else {
        // Something happened in setting up the request that triggered an error
        showError("An error occurred during the request.");
      }
      return Promise.reject(error);
    }
  );
};

export default axiosInstance;
export { attachInterceptors };
