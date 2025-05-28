const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: { 
    type: String,
    required: [true, 'First name is required'], 
    trim: true, 
  },
  lastName: { 
    type: String,
    required: [true, 'Last name is required'], 
    trim: true, 
  },
  email: {
    type: String,
    required: true, 
    unique: true, 
    trim: true, 
    lowercase: true, 
    match: [/.+@.+\..+/, 'Please fill a valid email address'], 
  },
  password: {
    type: String,
    required: true, 
  },
  userType: {
    type: String,
    enum: ['customer', 'farmer'], 
    default: 'customer', 
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
});


userSchema.pre('save', async function(next) {
  
  if (!this.isModified('password')) { 
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10); 
    this.password = await bcrypt.hash(this.password, salt); 
    next(); 
  } catch (error) {
    next(error); 
  }
});

// Method to compare password for login
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password); 
};

const User = mongoose.model('User', userSchema); 
module.exports = User; 