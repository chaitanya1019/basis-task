import React, { Fragment, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignInSide = (props) => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    email: '',
    otp: '',
    firstName: '',
    lastName: '',
    referralCode: '',
  });

  const [otpSent, setOTPSent] = useState(false);
  const [otpVerified, setOTPVerified] = useState(false);

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (!otpSent) {
      sendOTP();
    } else if (!otpVerified) {
      verifyOTP();
    } else {
      console.log(otpSent, otpVerified);
      createAccount();
    }
  };

  const sendOTP = () => {
    console.log('sending otp');
    setTimeout(() => {
      setOTPSent(true);
    }, 1000);
  };

  const verifyOTP = () => {
    console.log('verifying otp');

    setTimeout(() => {
      setOTPVerified(true);
    }, 1000);
  };

  const createAccount = () => {
    console.log('creating account');
  };

  const ButtonTxt = () => {
    if (!otpSent) {
      return 'Request otp';
    } else if (!otpVerified) {
      return 'Verify';
    } else {
      return 'Create Account';
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Hello there
          </Typography>
          <form className={classes.form} onSubmit={onSubmit} noValidate>
            <Grid container spacing={2}>
              {!otpSent && (
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={values.email}
                    onChange={onChange}
                    autoComplete="email"
                    autoFocus
                  />
                </Grid>
              )}

              {otpSent && !otpVerified && (
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="otp"
                    value={values.otp}
                    onChange={onChange}
                    label="OTP"
                    type="text"
                    id="otp"
                    // autoComplete="current-password"
                  />
                </Grid>
              )}

              {otpSent && otpVerified && (
                <Fragment>
                  {' '}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="fname"
                      name="firstName"
                      variant="outlined"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      value={values.firstName}
                      onChange={onChange}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      value={values.lastName}
                      onChange={onChange}
                      autoComplete="lname"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Referral Code"
                      name="referralCode"
                      value={values.referralCode}
                      onChange={onChange}
                      // autoComplete="email"
                    />
                  </Grid>
                </Fragment>
              )}
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}>
              {ButtonTxt()}
            </Button>

            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

SignInSide.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
};

export default SignInSide;
