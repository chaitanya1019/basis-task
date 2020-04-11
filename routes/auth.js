const express = require('express');
const auth = require('../middleware/auth');
const OTP = require('../models/OTP');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');

const router = express.Router();

// @route       GET api/auth/user
// desc         Get logged in user
// @access      Private
router.get('/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       POST api/auth/otp
// desc         Auth user
// @access      Public
router.post('/otp', async (req, res) => {
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

    //check if an user exists with this email in users collection
    let user = await User.findOne({ email });
    let token = '';

    if (user) {
      const payload = {
        user: {
          id: user.id,
        },
      };

      token = jwt.sign(payload, config.get('jwtSecret'), {
        algorithm: 'HS256',
        expiresIn: config.get('jwt_expires_in'),
      });
    }

    //otp matched
    // return success response code with msg
    res.status(200).json({
      message: 'correct',
      token,
      user,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error!!');
  }
});

module.exports = router;
