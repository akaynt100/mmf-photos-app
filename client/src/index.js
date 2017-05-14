import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Routes from './routes';
import configureStore from './store/configureStore';
import '../dist/assets/css/app.css';

const store = configureStore();

render(
  <Provider store={store}>
    <div className="app">
      {Routes}
    </div>
  </Provider>,
  document.getElementById('root')
);
