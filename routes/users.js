const express = require('express');
const router = express.Router();

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
      res.status(422).json({ msg: 'User already exists' });
    }

    user = new User({
      firstName,
      lastName,
      email,
    });

    await user.save();

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
    let randomNumber = Math.floor(1000 + Math.random() * 9000); //generate random number between 1000 and 9999

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

module.exports = router;
