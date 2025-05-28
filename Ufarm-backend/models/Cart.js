const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartItemSchema = new mongoose.Schema({
  productId: { type: String, required: true }, 
  name: { type: String, required: true },
  price: { type: String, required: true }, 
  quantity: { type: Number, required: true, min: 1 },
  image: { type: String },
  farmName: { type: String },
  
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
    unique: true, 
  },
  items: [cartItemSchema],
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});


cartSchema.pre('save', function(next) {
  this.lastUpdated = Date.now();
  next();
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;