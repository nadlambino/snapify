import axios from 'axios';

declare global {
  interface Window {
      axios: any;
  }
}

if (!window.axios) {
  window.axios = axios
}
