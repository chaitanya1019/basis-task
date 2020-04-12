import React from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Grid,
  TextField,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

const RegistrationForm = ({
  onChange,
  firstName,
  lastName,
  referralCode,
  referralEmail,
  validate_referralCode,
  clear_referralCode,
}) => {
  const referralDataCheck = () => {
    return referralEmail && referralCode.trim();
  };

  const handleClearBtnClick = () => {
    onChange('ref', 'red');
    clear_referralCode();
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          autoComplete="fName"
          name="firstName"
          variant="outlined"
          required
          fullWidth
          id="firstName"
          label="First Name"
          value={firstName}
          onChange={onChange()}
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
          onChange={onChange()}
          autoComplete="lastName"
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="referralCode">Referral Code</InputLabel>
          <OutlinedInput
            id="referralCode"
            name="referralCode"
            value={referralCode}
            onChange={onChange()}
            type="text"
            endAdornment={
              <InputAdornment position="end">
                {referralDataCheck() && (
                  <IconButton
                    aria-label="clear referral code"
                    onClick={onChange('referralCode', '')}>
                    <ClearIcon />
                  </IconButton>
                )}

                <Button
                  color="secondary"
                  onClick={() => validate_referralCode(referralCode)}
                  disabled={!referralCode.trim() || referralEmail}>
                  {referralDataCheck() ? 'Applied' : 'Apply'}
                </Button>
              </InputAdornment>
            }
            labelWidth={97}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default RegistrationForm;
