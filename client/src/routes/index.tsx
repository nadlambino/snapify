import withAuth from '../middlewares/withAuth'
import withoutAuth from '../middlewares/withoutAuth'
import App from '../pages/App'
import Auth from '../pages/Auth'
import Settings from '../pages/Settings'
import PageNotFound from './../pages/PageNotFound'

const AppPage = withAuth(App)
const AuthPage = withoutAuth(Auth)
const SettingsPage = withAuth(Settings)

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
  {
    path: '/settings',
    element: <SettingsPage />,
    errorElement: <PageNotFound />
  }
]
