/* eslint-disable import/default */
require('es6-promise').polyfill();
import './src/utils/polyfills';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import configureStore, { history } from './src/store/configureStore';
import Root from './src/components/Root';
import { getConfig } from './src/actions';
import './styles/styles.scss';
const store = configureStore();

store.dispatch(getConfig()).then(() => {

});

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./src/components/Root', () => {
    const NewRoot = require('./src/components/Root').default;
    render(
      <AppContainer>
        <NewRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('app')
    );
  });
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}