import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Link,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
} from '@material-ui/core';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/authActions';
import { Link as RLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      marginRight: 46,
    },
  },
}));

const Header = ({ auth: { isAuthenticated, user }, logout }) => {
  const classes = useStyles();

  const authLinks = (
    <Fragment>
      <Typography variant="button" className={classes.sectionDesktop}>
        Hello {user && user.firstName}
      </Typography>
      <Button color="inherit" onClick={logout} aria-label="logout">
        Logout
      </Button>
    </Fragment>
  );

  const guestLinks = (
    <Link
      component={RLink}
      variant="button"
      color="inherit"
      to="/auth"
      underline="none"
      // className={classes.link}
    >
      Register/Login
    </Link>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Basis
          </Typography>
          {isAuthenticated ? authLinks : guestLinks}
        </Toolbar>
      </AppBar>
    </div>
  );
};

Header.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Header);
