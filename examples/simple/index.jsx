import 'babel-core/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import configureStore from './store/configureStore';
import { addQueueTrigger } from './triggers/primeStateTriggers';

const store = configureStore();
store.dispatch( addQueueTrigger() );

const rootComponent =
  <Provider store={ store }>
    <App />
  </Provider>;

render( rootComponent, document.getElementById( 'root' ) );

