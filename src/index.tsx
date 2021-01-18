import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Shop from './components/pages/Shop';
import './index.scss';

ReactDOM.render(
  <BrowserRouter>
    <Shop />
  </BrowserRouter>,
  document.getElementById('root')
);
