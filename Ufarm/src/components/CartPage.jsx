import React from 'react';

const CartPage = ({
  cartItems,
  updateQuantity,
  removeFromCart,
  showPage,
  onCheckout,
  
}) => {
  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => {
      const priceString = String(item.price).replace(/[^0-9.]/g, ''); 
      const price = parseFloat(priceString) || 0;
      return sum + price * item.quantity;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const deliveryCost = cartItems.length > 0 ? 50.00 : 0.00; 
  const total = subtotal + deliveryCost;

  const handleQuantityChange = (itemId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    updateQuantity(itemId, newQuantity);
  };

  const handleCheckoutClick = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty. Add some items before checking out!");
      return;
    }
    onCheckout();
  };

  return (
    <section id="cart-page">
      <h2>My Cart</h2>
      <div className="cart-container">
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div className="cart-empty-message" style={{ textAlign: 'center', padding: '20px' }}>
              <p>Your cart is currently empty.</p>
              <button className="btn btn-primary" onClick={() => showPage('produce')}>
                Shop for Produce
              </button>
            </div>
          ) : (
            cartItems.map(item => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="farm-name">{item.farmName}</p>
                </div>
                <div className="item-price">{item.price}</div>
                <div className="item-quantity">
                  <button
                    className="quantity-btn minus"
                    onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    min="0"
                    max="100"
                    readOnly
                    aria-label={`Quantity for ${item.name}`}
                  />
                  <button
                    className="quantity-btn plus"
                    onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                  >
                    +
                  </button>
                </div>
                <div className="item-total">
                  ₱{( (parseFloat(String(item.price).replace(/[^0-9.]/g, '')) || 0) * item.quantity).toFixed(2)}
                </div>
                <button className="remove-item" onClick={() => removeFromCart(item.id)} aria-label={`Remove ${item.name} from cart`}>
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
            <div className="cart-summary">
                <h3>Order Summary</h3>
                <div className="summary-row">
                    <span>Subtotal</span>
                    <span>₱{subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                    <span>Delivery</span>
                    <span>₱{deliveryCost.toFixed(2)}</span>
                </div>
                <div className="summary-row total">
                    <span>Total</span>
                    <span>₱{total.toFixed(2)}</span>
                </div>
                <button className="btn btn-primary checkout-btn" onClick={handleCheckoutClick}>
                  CHECKOUT
                </button>
            </div>
        )}
      </div>
    </section>
  );
};

export default CartPage;