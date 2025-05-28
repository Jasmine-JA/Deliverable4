const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

const router = express.Router();

// --- Registration Route ---
router.post('/register', async (req, res) => {
  
  const { firstName, lastName, email, password, userType } = req.body;

  try {
    
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'Please fill out all required fields.' });
    }

    
    let user = await User.findOne({ email }); 
    if (user) {
      return res.status(400).json({ message: 'User already exists with this email.' }); 
    }

    
    user = new User({
      firstName, 
      lastName, 
      email, 
      password, 
      userType: userType || 'customer', 
    });

    await user.save(); 

    
    
    
    

    
    const userResponse = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userType: user.userType
    };

    res.status(201).json({ message: 'User registered successfully. Please login.', user: userResponse }); 

  } catch (error) {
    console.error('Registration error:', error.message); 
    if (error.name === 'ValidationError') {
        
        return res.status(400).json({ message: error.message, errors: error.errors });
    }
    if (error.code === 11000) { 
        return res.status(400).json({ message: 'Email already registered.' }); 
    }
    res.status(500).json({ message: 'Server error during registration.' }); 
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body; 

  try {
    
    const user = await User.findOne({ email }); 
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials. User not found.' }); 
    }

    
    const isMatch = await user.comparePassword(password); 
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials. Password incorrect.' }); 
    }

    
    
    const payload = {
      userId: user.id, 
      firstName: user.firstName, 
      lastName: user.lastName,   
      userType: user.userType, 
    };

    
    jwt.sign(
      payload,
      process.env.JWT_SECRET, 
      { expiresIn: 3600 * 24 }, 
      (err, token) => {
        if (err) throw err;
        res.json({
          success: true, 
          token: 'Bearer ' + token, 
          user: { 
            id: user.id, 
            firstName: user.firstName, 
            lastName: user.lastName,   
            email: user.email, 
            userType: user.userType 
          }
        });
      }
    );

  } catch (error) {
    console.error('Login error:', error.message); 
    res.status(500).json({ message: 'Server error during login.' }); 
  }
});

module.exports = router;