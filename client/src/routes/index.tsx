import authComponent from '../middlewares/auth'
import guessComponent from '../middlewares/guess'
import App from '../pages/App'
import Auth from '../pages/Auth'
import PageNotFound from './../pages/PageNotFound'

const AppPage = authComponent(App)
const AuthPage = guessComponent(Auth)

export default [
  {
    path: '/',
    element: <AppPage />,
    errorElement: <PageNotFound />
  },
  {
    path: '/auth',
    element: <AuthPage />,
    errorElement: <PageNotFound />
  },
]
