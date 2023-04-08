import { useCookies } from 'react-cookie'

export const isAuthenticated = () => {
  const [cookies] = useCookies()

  return cookies.token ? true : false
}
