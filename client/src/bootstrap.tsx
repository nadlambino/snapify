import axios from 'axios'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

declare global {
  interface Window {
      axios: any;
      apiUrl: string
      dayjs: dayjs.Dayjs
  }
}

if (!window.axios) {
  window.axios = axios
}

if (!window.apiUrl) {
  window.apiUrl = 'http://localhost'
}

if (!window.dayjs) {
  dayjs.extend(utc)
  window.dayjs = dayjs()
}