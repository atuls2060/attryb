import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import App from './App';
import AuthContextProvider from './Contexts/AuthContext';
import MarketPlaceContextProvider from './Contexts/MarketPlaceContext';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
      <MarketPlaceContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MarketPlaceContextProvider >
    </AuthContextProvider>
);