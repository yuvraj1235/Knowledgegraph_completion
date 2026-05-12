import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#19191f',
          color: '#e4e4e7',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '14px',
          fontSize: '14px',
          padding: '12px 16px',
        },
        success: {
          iconTheme: { primary: '#34d399', secondary: '#19191f' },
        },
        error: {
          iconTheme: { primary: '#f87171', secondary: '#19191f' },
        },
      }}
    />
  </React.StrictMode>,
);
