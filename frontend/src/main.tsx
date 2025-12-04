import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { TemaProvider } from './context/temaContext.tsx';
import i18n from "./i18n"
import { I18nextProvider } from "react-i18next";
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <TemaProvider>
        <App />
      </TemaProvider>
    </I18nextProvider>
  </StrictMode>
);
