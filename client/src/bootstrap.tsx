import axios from 'axios'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(utc)
dayjs.extend(relativeTime)

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
