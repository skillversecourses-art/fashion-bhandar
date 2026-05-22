import { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="contact-page">
      <div className="contact-header">
        <h1>Get In Touch</h1>
        <p>We'd love to hear from you. Our team usually replies within 24 hours.</p>
      </div>

      <div className="contact-grid">
        {/* Info Card */}
        <div className="contact-info-card">
          <h2>Contact Information</h2>

          <div className="contact-detail">
            <span className="contact-icon">📍</span>
            <div>
              <h4>Address</h4>
              <p>Mumbai, Maharashtra<br />Pin Code — 400104, India</p>
            </div>
          </div>

          <div className="contact-detail">
            <span className="contact-icon">📞</span>
            <div>
              <h4>Phone</h4>
              <p>+91 98765 43210</p>
            </div>
          </div>

          <div className="contact-detail">
            <span className="contact-icon">✉️</span>
            <div>
              <h4>Email</h4>
              <p>hello@fashionbhandar.com</p>
            </div>
          </div>

          <div className="contact-detail">
            <span className="contact-icon">🧾</span>
            <div>
              <h4>GST Number</h4>
              <p>27ARVPH9924N1ZQ</p>
            </div>
          </div>

          <div className="contact-detail">
            <span className="contact-icon">🕐</span>
            <div>
              <h4>Working Hours</h4>
              <p>Mon – Sat: 10 AM – 7 PM IST<br />Sunday: Closed</p>
            </div>
          </div>

          <div className="social-links">
            {["📘", "📸", "🐦", "📌"].map((icon, i) => (
              <div className="social-link" key={i}>{icon}</div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="contact-form-card">
          <h2>Send Us a Message</h2>

          {submitted ? (
            <div className="form-success">
              <p style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>✅</p>
              <p>Thank you for reaching out!</p>
              <p style={{ fontWeight: 400, color: "var(--text-soft)", marginTop: "0.5rem", fontSize: "0.95rem" }}>
                We'll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input type="text" placeholder="Rahul" required />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text" placeholder="Sharma" required />
                </div>
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="rahul@example.com" required />
              </div>

              <div className="form-group">
                <label>Subject</label>
                <select defaultValue="">
                  <option value="" disabled>Select a subject</option>
                  <option>Order Enquiry</option>
                  <option>Return &amp; Exchange</option>
                  <option>Product Information</option>
                  <option>Wholesale / Partnership</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea rows={5} placeholder="How can we help you?" required />
              </div>

              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
