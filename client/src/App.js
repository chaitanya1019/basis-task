import React from 'react';
import { withRouter } from 'react-router-dom';
import Routes from './components/routing/index';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import store from './store.js';
import Layout from './components/layout/Layout';
import setAuthToken from './utils/setAuthToken';

//Get token from local storage
const token = localStorage.getItem('basis-token');

if (token) {
  setAuthToken(token);
}

function App() {
  return (
    <Provider store={store}>
      <SnackbarProvider>
        <Layout>
          <Routes />
        </Layout>
      </SnackbarProvider>
    </Provider>
  );
}

export default withRouter(App);
