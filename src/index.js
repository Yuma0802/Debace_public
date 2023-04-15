import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './Past/provider/UserProvider';
import AccountEdit from './Container/AccountEdit';
import MyPage from './Container/MyPage';
import FavoriteDebatePage from './Page/FavoriteDebatePage';
import DebateRectangle from './Presentational/Organisms/DebateRectangle';
import Footer from './Presentational/Organisms/Footer';
import InformationMessage from './Presentational/Atoms/InformationMessage';
import ShareBtm from './Presentational/Atoms/ShareBtn';
import NewLoader from './Presentational/Atoms/NewLoader';
import { HelmetProvider } from 'react-helmet-async';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
