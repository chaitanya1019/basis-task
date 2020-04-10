import React, { Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './components/layout/Header';

import { Provider } from 'react-redux';
import store from './store.js';

function App() {
  return (
    <Provider store={store}>
      <CssBaseline />
      <Header />
    </Provider>
  );
}

export default App;
