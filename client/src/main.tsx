import './bootstrap';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import { CookiesProvider } from 'react-cookie';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import routes from './routes';
import './css/index.css';
import { FeedProvider } from './contexts/FeedContext';

const router = createBrowserRouter(routes);
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <FeedProvider>
            <RouterProvider router={router} />
          </FeedProvider>
        </QueryClientProvider>
      </Provider>
    </CookiesProvider>
  </React.StrictMode>
);
