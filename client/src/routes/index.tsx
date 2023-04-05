import App from '../pages/App'
import PageNotFound from './../pages/PageNotFound'

export default [
  {
    path: '/',
    element: <App />,
    errorElement: <PageNotFound />
  }
]
