import React, { Fragment, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './components/layout/Header';
import SignInSide from './components/auth/Register';


import { Provider } from 'react-redux';

function App() {


  return (
  <Fragment>
      <CssBaseline />
      <Header />
      <SignInSide />
	  </Fragment>
  );
}

export default App;
