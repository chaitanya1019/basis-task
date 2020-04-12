import React, { Fragment } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';

const OTPForm = ({ onChange, otp, email, otpSent }) => {
  return (
    <Fragment>
      {otpSent && (
        <Typography variant="subtitle2" align="center" gutterBottom>
          {`Please enter the OTP sent to ${email}`}{' '}
        </Typography>
      )}
      <TextField
        inputProps={{
          min: 1000,
          max: 9999,
        }}
        variant="outlined"
        margin="normal"
        type="number"
        required
        fullWidth
        id="otp"
        label="OTP"
        name="otp"
        value={otp}
        onChange={onChange()}
        autoComplete="otp"
        autoFocus
      />
    </Fragment>
  );
};

export default OTPForm;
