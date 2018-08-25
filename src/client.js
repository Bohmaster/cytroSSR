import App from './App';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import StaticRouter from 'react-router-dom/StaticRouter';
import React from 'react';
import { render, hydrate } from 'react-dom';
import routes from './routes';

const data = window._INITIAL_DATA_;

hydrate(
  <BrowserRouter>
    <App routes={routes} initialData={data} />
  </BrowserRouter>,
  document.getElementById('roott')
);

if (module.hot) {
  module.hot.accept();
}
