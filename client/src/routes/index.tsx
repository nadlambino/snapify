import App from '../pages/App'
import Auth from '../pages/Auth'
import PageNotFound from './../pages/PageNotFound'

export default [
  {
    path: '/',
    element: <App />,
    errorElement: <PageNotFound />
  },
  {
    path: '/auth',
    element: <Auth />,
    errorElement: <PageNotFound />
  }
]
