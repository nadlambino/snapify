import { useMemo } from 'react'
import { useCookies } from 'react-cookie'
import jwtDecode from 'jwt-decode'
import { UserType } from './../types/app'

const useAuth = () => {
  const [cookies] = useCookies()
  const token = useMemo(() => cookies.token, [cookies])
  const isAuthenticated = useMemo(() => token ? true : false, [token])
  const user = useMemo(() => {
    try {
      return token ? jwtDecode<UserType>(token) : null
    } catch (error) {
      return null
    }
  }, [isAuthenticated, token])

  return {
    isAuthenticated,
    user
  }
}

export default useAuth