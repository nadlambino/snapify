import './bootstrap'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import { CookiesProvider } from 'react-cookie'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import routes from './routes'
import './css/index.css'

const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </CookiesProvider>
  </React.StrictMode>,
)
