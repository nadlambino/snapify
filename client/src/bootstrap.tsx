import axios from 'axios';

declare global {
  interface Window {
      axios: any;
      apiUrl: string
  }
}

if (!window.axios) {
  window.axios = axios
}

if (!window.apiUrl) {
  window.apiUrl = 'http://localhost'
}