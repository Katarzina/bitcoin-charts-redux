import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'

const store = configureStore()
window.store = store
ReactDOM.render(
  <Provider store = {store}>
    <App />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
