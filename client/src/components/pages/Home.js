import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Home = ({ auth: { isAuthenticated, isLoading, user }, loadUser }) => {
  return <div>{user.firstName}</div>;
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
