import { useState, useEffect, useMemo } from 'react'
import { useCookies } from 'react-cookie'
import jwtDecode from 'jwt-decode'
import { UserType } from './../types/PostType'

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<UserType | null>()
  const [cookies] = useCookies()
  const token = useMemo(() => cookies.token, [cookies])

  useEffect(() => {
    setIsAuthenticated(() => token ? true : false)
    setUser(() => {
      try {
        return token ? jwtDecode<UserType>(token) : null
      } catch (error) {
        return null
      }
    })
  }, [])

  return {
    isAuthenticated,
    user
  }
}

export default useAuth