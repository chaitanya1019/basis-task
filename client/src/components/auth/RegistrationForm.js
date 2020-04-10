import React from 'react';
import { Grid, TextField } from '@material-ui/core';

const RegistrationForm = ({ onChange, firstName, lastName, referralCode }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          autoComplete="fname"
          name="firstName"
          variant="outlined"
          required
          fullWidth
          id="firstName"
          label="First Name"
          value={firstName}
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
          value={lastName}
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
          value={referralCode}
          onChange={onChange}
          // autoComplete="email"
        />
      </Grid>
    </Grid>
  );
};

export default RegistrationForm;
