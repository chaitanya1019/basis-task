import React, { Fragment, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './Header';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/authActions';
import PropTypes from 'prop-types';

const Layout = ({ children, loadUser, auth: { token } }) => {
  useEffect(() => {
    if (token) {
      loadUser();
    }
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
  auth: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUser })(Layout);
