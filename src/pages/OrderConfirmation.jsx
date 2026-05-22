import { useLocation, Link } from "react-router-dom";

export default function OrderConfirmation() {
  const { state } = useLocation();

  if (!state) {
    return (
      <main className="order-confirm-page">
        <div className="cart-empty">
          <div className="cart-empty-icon">📦</div>
          <h1>No Order Found</h1>
          <p>It seems like you haven't placed an order.</p>
          <Link to="/shop" className="btn-primary">Shop Now</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="order-confirm-page">
      <div className="confirm-wrapper">
        <div className="confirm-success-icon">
          <div className="confirm-check-circle">
            <svg viewBox="0 0 52 52" className="confirm-checkmark">
              <circle className="confirm-checkmark-circle" cx="26" cy="26" r="25" fill="none" />
              <path className="confirm-checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
          </div>
        </div>

        <h1 className="confirm-title">Order Placed Successfully! 🎉</h1>
        <p className="confirm-subtitle">
          Thank you for shopping with Fashion Bhandar! Your order has been confirmed.
        </p>

        <div className="confirm-order-card">
          <div className="confirm-order-header">
            <div>
              <span className="confirm-label">Order ID</span>
              <strong className="confirm-order-id">{state.orderId}</strong>
            </div>
            <div>
              <span className="confirm-label">Total Amount</span>
              <strong className="confirm-amount">₹{state.total?.toLocaleString("en-IN")}</strong>
            </div>
          </div>

          <div className="confirm-details-grid">
            <div className="confirm-detail-item">
              <span className="confirm-detail-icon">👤</span>
              <div>
                <span className="confirm-detail-label">Customer</span>
                <p>{state.name}</p>
              </div>
            </div>

            <div className="confirm-detail-item">
              <span className="confirm-detail-icon">✉️</span>
              <div>
                <span className="confirm-detail-label">Email</span>
                <p>{state.email}</p>
              </div>
            </div>

            <div className="confirm-detail-item">
              <span className="confirm-detail-icon">📍</span>
              <div>
                <span className="confirm-detail-label">Delivery Address</span>
                <p>{state.address}</p>
              </div>
            </div>

            <div className="confirm-detail-item">
              <span className="confirm-detail-icon">💳</span>
              <div>
                <span className="confirm-detail-label">Payment Method</span>
                <p style={{ textTransform: "capitalize" }}>{state.paymentMethod === "cod" ? "Cash on Delivery" : state.paymentMethod === "upi" ? "UPI" : state.paymentMethod === "netbanking" ? "Net Banking" : state.paymentMethod}</p>
              </div>
            </div>

            <div className="confirm-detail-item">
              <span className="confirm-detail-icon">📦</span>
              <div>
                <span className="confirm-detail-label">Items</span>
                <p>{state.itemCount} item{state.itemCount !== 1 ? "s" : ""}</p>
              </div>
            </div>

            <div className="confirm-detail-item">
              <span className="confirm-detail-icon">🚚</span>
              <div>
                <span className="confirm-detail-label">Estimated Delivery</span>
                <p>{getDeliveryDate()}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="confirm-info-bar">
          <p>📧 A confirmation email has been sent to <strong>{state.email}</strong></p>
        </div>

        <div className="confirm-actions">
          <Link to="/shop" className="btn-primary">Continue Shopping</Link>
          <Link to="/" className="btn-outline">Go Home</Link>
        </div>
      </div>
    </main>
  );
}

function getDeliveryDate() {
  const d = new Date();
  d.setDate(d.getDate() + 5 + Math.floor(Math.random() * 3));
  return d.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
