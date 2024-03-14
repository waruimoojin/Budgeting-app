// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../../backend/models/usersModel');

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(401).render('login', { error: 'Invalid email or password' });
      
      
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Passwords match, set up the session and redirect to a protected route
      req.session.user = user;
      return res.redirect('/Dashboard'); // Replace with your protected route
    } else {
      // Passwords do not match
      return res.status(401).render('login', { error: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user already exists with the given email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).render('register', { error: 'Email is already registered' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Redirect to the login page after successful registration
    res.redirect('/auth/login');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
