import '@/assets/styles/global.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';

import App from '@/App';
import ErrorBoundary from '@/ErrorBoundary';
import store from '@/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <ErrorBoundary>
          <App />
          <Toaster position='bottom-center' richColors visibleToasts={1} closeButton />
        </ErrorBoundary>
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);
