import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import Shop from './components/pages/Shop';
import './index.scss';

ReactDOM.render(
  <HashRouter>
    <Shop />
  </HashRouter>,
  document.getElementById('root')
);
