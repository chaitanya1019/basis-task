import React, { Fragment, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './Header';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/authActions';
import PropTypes from 'prop-types';

const Layout = ({ children, loadUser }) => {
  useEffect(() => {
    loadUser();
  }, []);
  return (
    <Fragment>
      <CssBaseline />
      <Header />
      {children}
    </Fragment>
  );
};

Layout.propTypes = {
  loadUser: PropTypes.func.isRequired,
};

export default connect(null, { loadUser })(Layout);
