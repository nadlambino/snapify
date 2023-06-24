import axios from 'axios'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(utc)
dayjs.extend(relativeTime)

declare global {
  interface Window {
    axios: any;
    apiUrl: string,
    reload: Function
  }
}

if (!window.axios) {
  window.axios = axios

  axios.interceptors.response.use(
    response => response,
    error => {
      console.log('An error occurred:', error.message);
      return Promise.reject(error);
    }
  );
}

if (!window.apiUrl) {
  window.apiUrl = ['localhost', '127.0.0.1'].includes(window.location.hostname) ? 'http://localhost' : 'https://test-mern-37wx.onrender.com'
}
