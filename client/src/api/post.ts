import { AxiosResponse } from "axios"
import { cookie } from "../utils/cookie"

export const createPost = async (post: FormData) => {
  return await window.axios.post(`${window.apiUrl}/post`, post, {
    headers: {
      Authorization: `Bearer ${cookie('token')}`,
      'Content-Type': 'multipart/form-data'
    }
  })
  .then((response: AxiosResponse) => response.data)
  .catch(() => null)
}

export const getPosts = async () => {
  return await window.axios.get(`${window.apiUrl}/post/feed`, {
    headers: {
      Authorization: `Bearer ${cookie('token')}`
    }
  })
  .then((response: AxiosResponse) => response.data)
  .catch(() => null)
}
