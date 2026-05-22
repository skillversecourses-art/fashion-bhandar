import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice, totalSavings, clearCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <main className="cart-page">
        <div className="cart-empty">
          <div className="cart-empty-icon">🛒</div>
          <h1>Your Cart is Empty</h1>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <Link to="/shop" className="btn-primary">Start Shopping</Link>
        </div>
      </main>
    );
  }

  const deliveryCharge = totalPrice >= 999 ? 0 : 99;
  const finalTotal = totalPrice + deliveryCharge;

  return (
    <main className="cart-page">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <p>{totalItems} item{totalItems !== 1 ? "s" : ""} in your cart</p>
      </div>

      <div className="cart-layout">
        {/* Cart Items */}
        <div className="cart-items">
          {items.map((item) => (
            <div className="cart-item" key={item.cartKey}>
              <div className="cart-item-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="cart-item-details">
                <div className="cart-item-top">
                  <div>
                    <p className="cart-item-category">{item.category}</p>
                    <h3 className="cart-item-name">{item.name}</h3>
                    <div className="cart-item-meta">
                      {item.size && <span>Size: {item.size}</span>}
                      {item.color && <span>Color: {item.color}</span>}
                    </div>
                  </div>
                  <button
                    className="cart-item-remove"
                    onClick={() => removeFromCart(item.cartKey)}
                    title="Remove"
                  >
                    ✕
                  </button>
                </div>

                <div className="cart-item-bottom">
                  <div className="cart-item-qty">
                    <button onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}>+</button>
                  </div>
                  <div className="cart-item-pricing">
                    <span className="cart-item-total">₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                    {item.originalPrice && (
                      <span className="cart-item-original">₹{(item.originalPrice * item.quantity).toLocaleString("en-IN")}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button className="cart-clear-btn" onClick={clearCart}>
            🗑️ Clear Cart
          </button>
        </div>

        {/* Order Summary */}
        <div className="cart-summary">
          <div className="cart-summary-card">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal ({totalItems} items)</span>
              <span>₹{totalPrice.toLocaleString("en-IN")}</span>
            </div>

            {totalSavings > 0 && (
              <div className="summary-row savings">
                <span>Total Savings</span>
                <span>-₹{totalSavings.toLocaleString("en-IN")}</span>
              </div>
            )}

            <div className="summary-row">
              <span>Delivery</span>
              <span className={deliveryCharge === 0 ? "free-delivery" : ""}>
                {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
              </span>
            </div>

            {deliveryCharge > 0 && (
              <p className="free-delivery-hint">
                Add ₹{(999 - totalPrice).toLocaleString("en-IN")} more for free delivery
              </p>
            )}

            <div className="summary-divider" />

            <div className="summary-row total">
              <span>Total</span>
              <span>₹{finalTotal.toLocaleString("en-IN")}</span>
            </div>

            <button className="cart-checkout-btn" onClick={() => navigate("/checkout")}>
              Proceed to Checkout →
            </button>

            <Link to="/shop" className="cart-continue-shopping">
              ← Continue Shopping
            </Link>

            <div className="cart-payment-icons">
              <span>🔒 Secure Checkout</span>
              <div className="payment-methods-mini">
                <span>💳</span>
                <span>🏦</span>
                <span>📱</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
