const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

// @route       GET api/auth
// desc         Get logged in user
// @access      Private
router.get('/', auth, (req, res) => {
  res.send('Get logged in user');
});

// @route       POST api/auth
// desc         Auth user
// @access      Public
router.post('/', (req, res) => {
  res.send('Login user');
});

module.exports = router;
