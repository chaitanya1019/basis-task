import React from 'react';
import TextField from '@material-ui/core/TextField';

const EmailForm = ({ onChange, email }) => {
  return (
    <TextField
      type="email"
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id="email"
      label="Email Address"
      name="email"
      value={email}
      onChange={onChange}
      autoComplete="email"
      autoFocus
    />
  );
};

export default EmailForm;
