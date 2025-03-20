import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './i18n'; // Import du fichier de configuration i18n

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
