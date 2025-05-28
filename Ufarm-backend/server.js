require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 

// Import routes
const authRoutes = require('./routes/authRoutes'); 

const app = express();
const PORT = process.env.PORT || 5001; 

// Middleware
app.use(cors()); 
app.use(express.json()); 

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
})
.then(() => console.log('Successfully connected to MongoDB!'))
.catch(err => console.error('MongoDB connection error:', err));

// API Routes
app.use('/api/auth', authRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Urban Harvest Hub API is running!');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});