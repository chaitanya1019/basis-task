import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import EmailForm from './EmailForm';
import OTPForm from './OTPForm';
import RegistrationForm from './RegistrationForm';
import { connect } from 'react-redux';
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
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  content: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(3, 0, 2),
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
}));

const steps = ['Email', 'OTP', 'Registration'];

const Authentication = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [values, setValues] = React.useState({
    email: '',
    otp: '',
    firstName: '',
    lastName: '',
    referralCode: '',
  });

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <EmailForm onChange={onChange} email={values.email} />;
      case 1:
        return <OTPForm onChange={onChange} otp={values.otp} />;
      case 2:
        return (
          <RegistrationForm
            onChange={onChange}
            firstName={values.firstName}
            lastName={values.lastName}
            referralCode={values.referralCode}
          />
        );
      default:
        throw new Error('Unknown step');
    }
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          {/* <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar> */}
          <Typography component="h1" variant="h1">
            Hello,
          </Typography>
          <div className={classes.content}>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div>
                  <Button
                    //   type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}>
                    {activeStep === steps.length - 1 ? 'Register' : 'Next'}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </div>
      </Grid>
    </Grid>
  );
};

Authentication.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, {})(Authentication);
