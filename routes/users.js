const express = require('express');
const router = express.Router();
const config = require('config');
const User = require('../models/User');
const OTP = require('../models/OTP');

// @route       POST api/users/signup
// desc         Register a user
// @access      Public
router.post('/signup', async (req, res) => {
  const { firstName, lastName, email } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user) {
      res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      firstName,
      lastName,
      email,
    });

    await user.save();

    //create a payload with created user id
    const payload = {
      user: {
        id: user.id,
      },
    };

    // encrypt payload with jwt
    // set expiry time 60 mins
    // send the encoded token back to client
    jwt.sign(
      payload,
      config.get('jwtSecret'),
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );

    res.send('Registration Success');
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error!!');
  }
});

// @route       POST api/users/signup/status
// desc         Get User status
// @access      Public
router.post('/signup/status', async (req, res) => {
  const { email } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user) {
      res.json({
        message: 'Account Details',
        userDetails: {
          eamil: 'VERIFIED',
        },
      });
    } else {
      res.json({
        message: 'Account Details',
        userDetails: {
          eamil: 'NOT_FOUND',
        },
      });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error!!');
  }
});

// @route       POST api/users/otp/generate
// desc         Generate OTP
// @access      Public
router.post('/otp/generate', async (req, res) => {
  const { email } = req.body;
  try {
    //4 digit random number
    //generate random number between 1000 and 9999
    let randomNumber = Math.floor(1000 + Math.random() * 9000);

    // find otp in collection by email
    let otp = await OTP.findOne({ email });

    if (otp) {
      //otp found
      //update otp
      await OTP.findByIdAndUpdate(
        otp.id,
        {
          $set: { otp: randomNumber },
        },
        { new: true }
      );
    } else {
      //create otp obj
      let newOTP = new OTP({ email, otp: randomNumber });
      //save otp
      await newOTP.save();
    }

    //check if an user exists with this email in users collection
    let user = await User.findOne({ email });

    //If user exists with the email send Verified
    // else Not found attached to his email in response
    // along with status success
    res.json({
      status: 'Success',
      email: user ? 'VERIFIED' : 'NOT_FOUND',
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error!!');
  }
});

// @route       POST api/users/otp/verify
// desc         Verify OTP
// @access      Public
router.post('/otp/verify', async (req, res) => {
  const { email, otp } = req.body;
  try {
    // get otp by email
    let otpObj = await OTP.findOne({ email });

    // if otp is not found
    // return msg with error response code 400
    if (!otpObj) {
      return res.status(400).json({ msg: 'Invalid user' });
    }

    //comparing request otp with that of otp from collection
    const isMatch = otpObj.otp === otp;

    //otp mismatch
    //return error with response code 400 and msg
    if (!isMatch) {
      return res.status(400).json({ message: 'OTP is incorrect' });
    }

    //otp matched
    // return success response code with msg
    res.status(200).json({
      message: 'verified',
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error!!');
  }
});

module.exports = router;
