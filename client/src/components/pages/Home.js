import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
}));

const Home = ({ auth: { isAuthenticated, isLoading, user }, loadUser }) => {
  const classes = useStyles();
  return (
    <div className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography variant="h2">{user && user.firstName}</Typography>
        <Typography variant="h6" gutterBottom>
          Referral Link
        </Typography>
        <Typography variant="body2">{`${
          window.location.origin
        }/auth?referralCode=${user && user.referralCode}`}</Typography>
      </Paper>
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
