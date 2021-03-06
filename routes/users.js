const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');
const shortid = require('shortid');

const email_helper = require('../helper.js');
const User = require('../models/User');
const OTP = require('../models/OTP');

const router = express.Router();

// @route       POST api/users/signup
// desc         Register a user
// @access      Public
router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, referredBy } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user) {
      res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      firstName,
      lastName,
      email,
      referralCode: shortid.generate(),
      referredBy: referredBy,
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
        res.json({
          token,
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            referralCode: user.referralCode,
            referredBy: user.referredBy,
          },
        });
      }
    );
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
      otp = await OTP.findByIdAndUpdate(
        otp.id,
        {
          $set: { otp: randomNumber },
        },
        { new: true }
      );
    } else {
      //create otp obj
      otp = new OTP({ email, otp: randomNumber });
      //save otp
      await otp.save();
    }

    email_helper(
      email,
      'Use the bewlow otp for authentication',
      'OTP Authentication',
      `<h3>Use the below otp for authentication</h3> <br/> <h4>${otp.otp}</h4>`
    );

    // send response with status success
    res.json({
      msg: 'OTP SENT',
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
      return res.status(400).json({ msg: 'OTP is incorrect' });
    }

    //otp matched
    // return success response code with msg
    res.status(200).json({
      msg: 'correct',
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error!!');
  }
});

// @route       POST api/users/referral/verify
// desc         Verify Referral Code
// @access      Public
router.post('/referral/verify', async (req, res) => {
  const { referralCode } = req.body;
  try {
    // get user by referral code
    const referredBy = await User.findOne({ referralCode });

    // if user is not found
    // return msg with error response code 400
    if (!referredBy) {
      return res.status(400).json({ msg: 'Invalid Referral Code' });
    }

    res.status(200).json({
      msg: 'correct',
      email: referredBy.email,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error!!');
  }
});

module.exports = router;
