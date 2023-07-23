import { AxiosResponse } from "axios"

export type SignInData = {
  email: string | null, 
  password: string | null
}

export type SignUpData = {
  firstName: string | null,
  lastName: string | null,
  gender: 'male' | 'female' | 'other' | null,
  email: string | null,
  password: string | null,
  confirm: string | null
}

export const signIn = async (user: SignInData) => {
  return await window.axios.post(`${window.apiUrl}/signin`, user)
    .then((response: AxiosResponse) => response.data)
    .catch(() => null)
}

export const signUp = async (user: SignUpData) => {
  return await window.axios.post(`${window.apiUrl}/signup`, user)
    .then((response: AxiosResponse) => response.data)
    .catch(() => null)
}