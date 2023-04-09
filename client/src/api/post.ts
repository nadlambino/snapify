import { AxiosResponse } from "axios"
import { cookie } from "../utils/cookie"

export const createPost = async (post: {content: string}) => {
  return await window.axios.post(`${window.apiUrl}/post`, post, {
    headers: {
      Authorization: `Bearer ${cookie('token')}`
    }
  })
    .then((response: AxiosResponse) => response.data)
    .catch(() => null)
}
