import React from 'react';
import TextField from '@material-ui/core/TextField';

const OTPForm = ({ onChange, otp }) => {
  return (
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
      onChange={onChange}
      autoComplete="otp"
      autoFocus
    />
  );
};

export default OTPForm;
