import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import store from './Store/Store';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import GamePage from './components/GamePage/Main';
import HomePage from './components/MainPage/HomePage';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

initializeIcons()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='Game' element={<GamePage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
