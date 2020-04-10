import React from 'react';
import TextField from '@material-ui/core/TextField';

const OTPForm = ({ onChange, otp }) => {
  return (
    <TextField
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
