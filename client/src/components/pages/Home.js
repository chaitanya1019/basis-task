import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const Home = ({ auth: { isAuthenticated, isLoading, user }, loadUser }) => {
  return (
    <div>
      <Typography varaint="h2">{user && user.firstName}</Typography>
    </div>
  );
};

Home.propTypes = {
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, {})(Home);
