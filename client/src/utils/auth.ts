import { useCookies } from 'react-cookie'
import jwt_decode from 'jwt-decode'
import { cookie } from './cookie'
import { UserType } from '../types/PostType'

export const isAuthenticated = () => {
  const [cookies] = useCookies()

  return cookies.token ? true : false
}

export const getAuthUser = () : UserType | null => {
  const token = cookie('token')
  if (token) {
    try {
      return jwt_decode<UserType>(token)
    } catch (error) {
      return null
    }
  }

  return null
}
