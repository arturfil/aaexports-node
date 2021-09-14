const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// POST - Sign Up
router.post('/signup', async (req, res) => {
  const user = await User.create(req.body);
  try {
    user.salt = undefined;
    user.hashed_password = undefined;
    return res.status(201).json(user)
  } catch (error) {
    return res.status(500).json({message: "Error, check user properties ", error});
  }
})

// POST - Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const userToLogIn = await User.findOne({email});
  if (!userToLogIn) {
    return res.json({message: "User doesn't exist"});
  }
  if (!userToLogIn.authenticate(password)) {
    return res.json({message: "Check credential"});
  }
  const token = jwt.sign({_id: userToLogIn._id}, process.env.SECRET);
  res.cookie('t', token, {expire: new Date() + 9999});
  const { _id, name, role} = userToLogIn;
  return res.status(201).json({token, user: {_id, email, name, role}});
});

router.post('/signout', async (req, res) => {
  res.clearCookie('t');
  return res.status(200).json({message: "Signed out succesfully"});
})

module.exports = router;