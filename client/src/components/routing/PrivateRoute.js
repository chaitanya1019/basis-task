import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = (
  { component: Component, auth: { isAuthenticated, isLoading } },
  ...rest
) => {
  console.log(isAuthenticated, isLoading);
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !isLoading ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }></Route>
  );
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, {})(PrivateRoute);
