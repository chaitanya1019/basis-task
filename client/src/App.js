import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './components/layout/Header';
import Authentication from './components/auth/Authentication';

import { Provider } from 'react-redux';
import store from './store.js';

function App() {
  return (
    <Provider store={store}>
      <CssBaseline />
      <Header />
      <Authentication />
    </Provider>
  );
}

export default App;
