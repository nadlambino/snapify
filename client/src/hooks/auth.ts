import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import jwtDecode from 'jwt-decode'
import { UserType } from './../types/PostType'

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<UserType | null>()
  const [cookies] = useCookies()

  useEffect(() => {
    setIsAuthenticated(() => cookies.token)
    setUser(() => {
      const token = cookies.token
      try {
        return token ? jwtDecode<UserType>(token) : null
      } catch (error) {
        return null
      }

    })
  }, [cookies])

  return {
    isAuthenticated,
    user
  }
}

export default useAuth