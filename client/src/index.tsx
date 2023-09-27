import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthenticationProvider } from './context/AuthenticationProvider';
import { CommunicationProvider } from './context/CommunicationsProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CommunicationProvider>
        <AuthenticationProvider>
          <App />
        </AuthenticationProvider>
      </CommunicationProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
reportWebVitals();
