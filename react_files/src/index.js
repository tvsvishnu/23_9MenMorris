import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import RegisterPage from './register';
import LoginPage from './login';
import 'semantic-ui-css/semantic.min.css';
// import SpotifyAPI from './spotify';
// import ChatPage from './chatpage';
// import AdminPage from './adminpage';

import 'semantic-ui-css/semantic.min.css'
// import HistoryPage from './historypage';
import NAvbar from './navbar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <center>
    <App />
    </center>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
