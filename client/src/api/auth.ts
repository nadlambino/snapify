import { AxiosResponse } from "axios"

export const signIn = async (user: object) => {
  return await window.axios.post(`${window.apiUrl}/signin`, user)
    .then((response: AxiosResponse) => response.data)
    .catch(() => null)
}

export const signUp = async (user: object) => {
  return await window.axios.post(`${window.apiUrl}/signup`, user)
    .then((response: AxiosResponse) => response.data)
    .catch(() => null)
}