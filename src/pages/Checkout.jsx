import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const PAYMENT_METHODS = [
  { id: "upi", label: "UPI / Google Pay / PhonePe", icon: "📱", desc: "Pay via any UPI app" },
  { id: "card", label: "Credit / Debit Card", icon: "💳", desc: "Visa, Mastercard, RuPay" },
  { id: "netbanking", label: "Net Banking", icon: "🏦", desc: "All major banks supported" },
  { id: "cod", label: "Cash on Delivery", icon: "💵", desc: "Pay when you receive" },
  { id: "wallet", label: "Wallet / Paytm", icon: "👛", desc: "Paytm, Amazon Pay, etc." },
];

const STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh",
  "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
  "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
  "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

export default function Checkout() {
  const { items, totalPrice, totalSavings, clearCart } = useCart();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: address, 2: payment, 3: review
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    pincode: "",
    // Card details
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
    cardName: "",
    // UPI
    upiId: "",
    // Net banking
    bankName: "",
  });

  const [errors, setErrors] = useState({});

  if (items.length === 0) {
    return (
      <main className="checkout-page">
        <div className="cart-empty">
          <div className="cart-empty-icon">🛒</div>
          <h1>Nothing to Checkout</h1>
          <p>Your cart is empty. Add some items first!</p>
          <Link to="/shop" className="btn-primary">Shop Now</Link>
        </div>
      </main>
    );
  }

  const deliveryCharge = totalPrice >= 999 ? 0 : 99;
  const finalTotal = totalPrice + deliveryCharge;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateAddress = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^[6-9]\d{9}$/.test(formData.phone)) newErrors.phone = "Invalid 10-digit number";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.pincode.trim()) newErrors.pincode = "PIN code is required";
    else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = "Invalid 6-digit PIN";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = () => {
    const newErrors = {};
    if (paymentMethod === "card") {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = "Card number is required";
      else if (formData.cardNumber.replace(/\s/g, "").length < 16) newErrors.cardNumber = "Invalid card number";
      if (!formData.cardExpiry.trim()) newErrors.cardExpiry = "Expiry is required";
      if (!formData.cardCvv.trim()) newErrors.cardCvv = "CVV is required";
      if (!formData.cardName.trim()) newErrors.cardName = "Name on card is required";
    }
    if (paymentMethod === "upi") {
      if (!formData.upiId.trim()) newErrors.upiId = "UPI ID is required";
      else if (!formData.upiId.includes("@")) newErrors.upiId = "Invalid UPI ID (e.g. name@upi)";
    }
    if (paymentMethod === "netbanking") {
      if (!formData.bankName) newErrors.bankName = "Please select a bank";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateAddress()) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (step === 2 && validatePayment()) {
      setStep(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      const orderId = "FB" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substr(2, 4).toUpperCase();
      clearCart();
      navigate("/order-confirmation", {
        state: {
          orderId,
          total: finalTotal,
          paymentMethod,
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          address: `${formData.address}${formData.apartment ? ", " + formData.apartment : ""}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
          itemCount: items.length,
        },
      });
    }, 2500);
  };

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 16);
    return cleaned.replace(/(.{4})/g, "$1 ").trim();
  };

  return (
    <main className="checkout-page">
      <div className="checkout-header">
        <h1>Checkout</h1>
        {/* Step indicator */}
        <div className="checkout-steps">
          {[
            { num: 1, label: "Shipping" },
            { num: 2, label: "Payment" },
            { num: 3, label: "Review" },
          ].map((s) => (
            <div
              key={s.num}
              className={`checkout-step${step >= s.num ? " active" : ""}${step === s.num ? " current" : ""}`}
            >
              <div className="step-circle">{step > s.num ? "✓" : s.num}</div>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="checkout-layout">
        {/* Main form area */}
        <div className="checkout-form-area">
          {/* Step 1: Shipping Address */}
          {step === 1 && (
            <div className="checkout-section">
              <h2>📍 Shipping Address</h2>

              <div className="form-row">
                <div className="form-group">
                  <label>First Name *</label>
                  <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                    className={errors.firstName ? "error" : ""}
                  />
                  {errors.firstName && <span className="field-error">{errors.firstName}</span>}
                </div>
                <div className="form-group">
                  <label>Last Name *</label>
                  <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                    className={errors.lastName ? "error" : ""}
                  />
                  {errors.lastName && <span className="field-error">{errors.lastName}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={errors.email ? "error" : ""}
                  />
                  {errors.email && <span className="field-error">{errors.email}</span>}
                </div>
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    className={errors.phone ? "error" : ""}
                  />
                  {errors.phone && <span className="field-error">{errors.phone}</span>}
                </div>
              </div>

              <div className="form-group">
                <label>Street Address *</label>
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="House no., Street, Area"
                  className={errors.address ? "error" : ""}
                />
                {errors.address && <span className="field-error">{errors.address}</span>}
              </div>

              <div className="form-group">
                <label>Apartment / Floor (Optional)</label>
                <input
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleChange}
                  placeholder="Apartment, suite, floor, etc."
                />
              </div>

              <div className="form-row form-row-3">
                <div className="form-group">
                  <label>City *</label>
                  <input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    className={errors.city ? "error" : ""}
                  />
                  {errors.city && <span className="field-error">{errors.city}</span>}
                </div>
                <div className="form-group">
                  <label>State *</label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={errors.state ? "error" : ""}
                  >
                    <option value="">Select State</option>
                    {STATES.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                  {errors.state && <span className="field-error">{errors.state}</span>}
                </div>
                <div className="form-group">
                  <label>PIN Code *</label>
                  <input
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="6-digit PIN"
                    maxLength={6}
                    className={errors.pincode ? "error" : ""}
                  />
                  {errors.pincode && <span className="field-error">{errors.pincode}</span>}
                </div>
              </div>

              <div className="checkout-nav-btns">
                <Link to="/cart" className="btn-outline">← Back to Cart</Link>
                <button className="btn-primary" onClick={handleNext}>
                  Continue to Payment →
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <div className="checkout-section">
              <h2>💳 Payment Method</h2>

              <div className="payment-methods">
                {PAYMENT_METHODS.map((pm) => (
                  <label
                    key={pm.id}
                    className={`payment-option${paymentMethod === pm.id ? " selected" : ""}`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={pm.id}
                      checked={paymentMethod === pm.id}
                      onChange={() => {
                        setPaymentMethod(pm.id);
                        setErrors({});
                      }}
                    />
                    <span className="payment-icon">{pm.icon}</span>
                    <div className="payment-label">
                      <strong>{pm.label}</strong>
                      <small>{pm.desc}</small>
                    </div>
                  </label>
                ))}
              </div>

              {/* Conditional payment form fields */}
              {paymentMethod === "upi" && (
                <div className="payment-detail-form">
                  <h3>Enter UPI ID</h3>
                  <div className="form-group">
                    <label>UPI ID *</label>
                    <input
                      name="upiId"
                      value={formData.upiId}
                      onChange={handleChange}
                      placeholder="yourname@upi"
                      className={errors.upiId ? "error" : ""}
                    />
                    {errors.upiId && <span className="field-error">{errors.upiId}</span>}
                  </div>
                  <p className="payment-hint">
                    A payment request will be sent to your UPI app after placing the order.
                  </p>
                </div>
              )}

              {paymentMethod === "card" && (
                <div className="payment-detail-form">
                  <h3>Card Details</h3>
                  <div className="form-group">
                    <label>Card Number *</label>
                    <input
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          cardNumber: formatCardNumber(e.target.value),
                        }));
                        if (errors.cardNumber) setErrors((prev) => ({ ...prev, cardNumber: null }));
                      }}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className={errors.cardNumber ? "error" : ""}
                    />
                    {errors.cardNumber && <span className="field-error">{errors.cardNumber}</span>}
                  </div>
                  <div className="form-group">
                    <label>Name on Card *</label>
                    <input
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      placeholder="Name as on card"
                      className={errors.cardName ? "error" : ""}
                    />
                    {errors.cardName && <span className="field-error">{errors.cardName}</span>}
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Expiry (MM/YY) *</label>
                      <input
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        maxLength={5}
                        className={errors.cardExpiry ? "error" : ""}
                      />
                      {errors.cardExpiry && <span className="field-error">{errors.cardExpiry}</span>}
                    </div>
                    <div className="form-group">
                      <label>CVV *</label>
                      <input
                        name="cardCvv"
                        type="password"
                        value={formData.cardCvv}
                        onChange={handleChange}
                        placeholder="•••"
                        maxLength={4}
                        className={errors.cardCvv ? "error" : ""}
                      />
                      {errors.cardCvv && <span className="field-error">{errors.cardCvv}</span>}
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "netbanking" && (
                <div className="payment-detail-form">
                  <h3>Select Your Bank</h3>
                  <div className="form-group">
                    <label>Bank *</label>
                    <select
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleChange}
                      className={errors.bankName ? "error" : ""}
                    >
                      <option value="">Select Bank</option>
                      <option value="sbi">State Bank of India</option>
                      <option value="hdfc">HDFC Bank</option>
                      <option value="icici">ICICI Bank</option>
                      <option value="axis">Axis Bank</option>
                      <option value="kotak">Kotak Mahindra Bank</option>
                      <option value="pnb">Punjab National Bank</option>
                      <option value="bob">Bank of Baroda</option>
                      <option value="canara">Canara Bank</option>
                      <option value="idbi">IDBI Bank</option>
                      <option value="other">Other Bank</option>
                    </select>
                    {errors.bankName && <span className="field-error">{errors.bankName}</span>}
                  </div>
                  <p className="payment-hint">
                    You will be redirected to your bank's website to complete payment.
                  </p>
                </div>
              )}

              {paymentMethod === "cod" && (
                <div className="payment-detail-form">
                  <h3>Cash on Delivery</h3>
                  <p className="payment-hint">
                    Pay with cash when your order is delivered. An additional fee of ₹49 applies for COD orders.
                  </p>
                </div>
              )}

              {paymentMethod === "wallet" && (
                <div className="payment-detail-form">
                  <h3>Mobile Wallet</h3>
                  <p className="payment-hint">
                    You will be redirected to your selected wallet app to complete the payment after placing the order.
                  </p>
                </div>
              )}

              <div className="checkout-nav-btns">
                <button className="btn-outline" onClick={() => setStep(1)}>← Back</button>
                <button className="btn-primary" onClick={handleNext}>
                  Review Order →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Review & Place Order */}
          {step === 3 && (
            <div className="checkout-section">
              <h2>📋 Review Your Order</h2>

              <div className="review-card">
                <h3>Shipping Address</h3>
                <p>
                  {formData.firstName} {formData.lastName}<br />
                  {formData.address}{formData.apartment && `, ${formData.apartment}`}<br />
                  {formData.city}, {formData.state} - {formData.pincode}<br />
                  📞 {formData.phone} · ✉️ {formData.email}
                </p>
                <button className="review-edit-btn" onClick={() => setStep(1)}>Edit</button>
              </div>

              <div className="review-card">
                <h3>Payment Method</h3>
                <p>
                  {PAYMENT_METHODS.find((pm) => pm.id === paymentMethod)?.icon}{" "}
                  {PAYMENT_METHODS.find((pm) => pm.id === paymentMethod)?.label}
                </p>
                <button className="review-edit-btn" onClick={() => setStep(2)}>Edit</button>
              </div>

              <div className="review-card">
                <h3>Order Items ({items.length})</h3>
                <div className="review-items">
                  {items.map((item) => (
                    <div className="review-item" key={item.cartKey}>
                      <img src={item.image} alt={item.name} />
                      <div>
                        <p className="review-item-name">{item.name}</p>
                        <small>
                          {item.size && `Size: ${item.size}`}
                          {item.size && item.color && " · "}
                          {item.color && `Color: ${item.color}`}
                          {" · "}Qty: {item.quantity}
                        </small>
                        <p className="review-item-price">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="checkout-nav-btns">
                <button className="btn-outline" onClick={() => setStep(2)}>← Back</button>
                <button
                  className="place-order-btn"
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <span className="processing-text">
                      <span className="spinner" />
                      Processing Payment...
                    </span>
                  ) : (
                    `🔒 Place Order · ₹${finalTotal.toLocaleString("en-IN")}`
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Summary */}
        <div className="checkout-sidebar">
          <div className="cart-summary-card">
            <h2>Order Summary</h2>

            <div className="checkout-items-preview">
              {items.map((item) => (
                <div className="checkout-preview-item" key={item.cartKey}>
                  <div className="checkout-preview-img">
                    <img src={item.image} alt={item.name} />
                    <span className="checkout-preview-qty">{item.quantity}</span>
                  </div>
                  <div className="checkout-preview-info">
                    <p>{item.name}</p>
                    <span>₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="summary-divider" />

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{totalPrice.toLocaleString("en-IN")}</span>
            </div>

            {totalSavings > 0 && (
              <div className="summary-row savings">
                <span>You Save</span>
                <span>-₹{totalSavings.toLocaleString("en-IN")}</span>
              </div>
            )}

            <div className="summary-row">
              <span>Delivery</span>
              <span className={deliveryCharge === 0 ? "free-delivery" : ""}>
                {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
              </span>
            </div>

            {paymentMethod === "cod" && (
              <div className="summary-row">
                <span>COD Fee</span>
                <span>₹49</span>
              </div>
            )}

            <div className="summary-divider" />

            <div className="summary-row total">
              <span>Total</span>
              <span>₹{(finalTotal + (paymentMethod === "cod" ? 49 : 0)).toLocaleString("en-IN")}</span>
            </div>

            <div className="cart-payment-icons">
              <span>🔒 100% Secure Payment</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
