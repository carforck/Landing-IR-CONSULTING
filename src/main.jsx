import React from 'react';
import { createRoot } from 'react-dom/client';
// Base primero: así el CSS de cada sección (importado por sus componentes) gana a igual especificidad.
import './styles.css';
import App from './App.jsx';
import { LangProvider } from './i18n/index.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LangProvider><App /></LangProvider>
  </React.StrictMode>,
);
