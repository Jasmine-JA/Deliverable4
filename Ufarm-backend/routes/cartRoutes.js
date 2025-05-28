const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const authMiddleware = require('../middleware/authMiddleware'); 


router.get('/', authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }); 
    if (!cart) {
      
      const newCart = new Cart({ userId: req.user.id, items: [] });
      await newCart.save();
      return res.json(newCart);
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart', error: error.message });
  }
});


router.post('/', authMiddleware, async (req, res) => {
  const { items } = req.body; 
  try {
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      cart = new Cart({ userId: req.user.id, items });
    } else {
      cart.items = items;
    }
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart', error: error.message });
  }
});


router.delete('/', authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId: req.user.id },
      { items: [] },
      { new: true } 
    );
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json({ message: 'Cart cleared successfully', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error clearing cart', error: error.message });
  }
});