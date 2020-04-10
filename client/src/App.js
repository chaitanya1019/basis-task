import React, { Fragment, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './components/layout/Header';
import SignInSide from './components/auth/Register';

import { Provider } from 'react-redux';
import store from './store.js';

function App() {
  return (
    <Provider store={store}>
      <CssBaseline />
      <Header />
      <SignInSide />
    </Provider>
  );
}

export default App;
